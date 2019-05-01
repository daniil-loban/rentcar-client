import React, { Component } from 'react'
import Select from '../../components/UI/select/select'
import classes from './search-panel.css'
import {connect} from 'react-redux'
import {
  setFilterOptions,
  setSelectedFilter,
  clearFilterSelectedOptions
} from '../../store/actions/filter-options'

const propByPath = {
  'model': { key: 'model', label:'Марка'},
  'price': { key: 'price', label:'Цена(у.е.)'},
  'properties.year': { key: 'year', label:'Год'},
  'properties.seats': { key: 'seats', label:'Места'},
  'properties.bags': { key: 'bags', label:'Багаж'},
  'properties.doors': { key: 'doors', label:'Двери'},
  'properties.ac': { key: 'ac', label:'АС'},
  'properties.transmission': { key: 'tms', label:'Трансмиссия'},
}  

class SearchPanel extends Component {
 
  selectChangeHandler = event =>{
    this.props.setSelectedFilter(event.target.id, event.target.value)
  }

  createFilledSelector = (key, label, optionsArr) => {
    return optionsArr.length > 1 ? <Select
      key={key}
      keyName={key}
      label={label}
      value={ this.props.selectedFilter[key]}
      onChange={this.selectChangeHandler}
      options={ [{text: "", value: ""}].concat(optionsArr.map(e => (
        {text: e, value: e}
        )))
      } 
    />
    : null
  }

  handlerOnClickClearFilter =(event) => {
    this.props.clearFilterSelectedOptions(this.props.cars)
  }

  render() {
    let select=[] 
    if (this.props.cars && this.props.filterOptions) {    
      Object.keys(propByPath).forEach((key) => {
        select.push(this.createFilledSelector(propByPath[key].key,propByPath[key].label, this.props.filterOptions[key]))
      });
    }
    return (
      <div ref={this.props.searchPanelRef} 
          style={this.props.searchPanelStyle} className={classes.searchPanel}>
        { (this.props.filteredCars.length < this.props.cars.length) && 
          <button 
            className ={classes.clearFilter}
            onClick={this.handlerOnClickClearFilter}>
          Сбросить фильтр
          </button>
        }
        {select}
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    cars: state.base.cars,
    filteredCars: state.base.filteredCars,
    filterOptions: state.filterOptions.filterOptions,
    selectedFilter: state.filterOptions.selectedFilter
  } 
}

function mapDispatchToProps(dispatch) {
  return {
    setFilterOptions:(cars) => dispatch(setFilterOptions(cars)),
    setSelectedFilter:(name, value) =>dispatch(setSelectedFilter(name, value)),
    clearFilterSelectedOptions:(cars) => dispatch(clearFilterSelectedOptions(cars))
  }
}

export default connect(mapStateToProps, mapDispatchToProps )(SearchPanel);