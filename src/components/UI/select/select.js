import React from 'react'
import classes from './select.css'

const Select = props => {
  const htmlFor = `${props.keyName}`

  return (
    <div className={classes.Select}>
      <label htmlFor={htmlFor}>{props.label}</label>
      <select
        id={htmlFor}
        value={props.value}
        onChange={props.onChange}
      >
        {props.options.map((option, index)=>{
          return (
            <option
              value = {option.value}
              key = {option.value + index}
            >
              {option.text}
            </option>
          )
        })}
      </select>
    </div>
  )
}

export default Select