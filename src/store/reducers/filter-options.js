import {
  SET_FILTER_OPTIONS,
  UPDATE_FILTER
} from '../actions/actionTypes.js'

const initialState = {
  filterOptions: null,
  selectedFilter: {
    model:"",
    price:"",
    year:"",
    seats:"",
    bags:"",
    doors:"",
    ac:"",
    tms:"",
  }
}

const getFlatObject = (obj, path = "") => {
  return Object.keys(obj).reduce((acc, e) => {
    if (obj[e] instanceof Object) {
      let temp = getFlatObject(obj[e], `${path}${path===''?'':'.'}${e}` )
      Object.keys(temp).forEach(inner => {
        acc[`${inner}`] = temp[inner];
      }) 
    } else {
      acc[`${path}${path===''?'':'.'}${e}`] = obj[e]
    }
    return acc
  }, {})
}

const sortByType = (arr)=> {
  if (typeof arr[0] === 'number') {
    return (a, b) => a - b;
  } else {
    return (a, b) => a >= b ? 1: -1;
  }
}

const agregate = arr => {
  const result = arr.reduce((acc, e) => {
    let flat = getFlatObject(e)
    Object.keys(flat).forEach(path => {
      if (acc[path]) {
        if (!acc[path].includes(flat[path]))
        acc[path] = acc[path].concat(flat[path])
      } else {
        acc[path] = [flat[path]]
      }
    })
    return acc;
  },{})
  Object.keys(result).forEach(key => result[key]=result[key].sort(sortByType(arr)))
  return result
}

export default function filterOptionsReducer(state = initialState, action) {
  switch(action.type) {
    case SET_FILTER_OPTIONS:
      const fo = agregate(action.cars)
      return {
        ...state,
        filterOptions: fo
      }
    case UPDATE_FILTER:
      const selectedFilter = {...state.selectedFilter, ...{[action.field.name]: action.field.value }}
       return {
        ...state,
        selectedFilter
      }
    default:
      return state
  }
}