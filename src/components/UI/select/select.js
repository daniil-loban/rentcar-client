import React from 'react'
import classes from './select.css'


const Select = props => {
  const {keyName, label, value, onChange, options} = props;
  const htmlFor = `${keyName}`

  return (
    <div className={classes.Select}>
      { /* eslint-disable-next-line jsx-a11y/label-has-for  */}
      <label htmlFor={htmlFor}>{label} </label>
      <select
        id={htmlFor}
        value={value}
        onChange={onChange}
      >
        {options.map((option)=>{
          return (
            <option
              value = {option.value}
              key = {option.value + Math.random()}
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