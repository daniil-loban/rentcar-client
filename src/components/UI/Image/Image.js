import React from 'react';
import classes from './image.css'

const Image = props => {

  const {source, title, min }  = props;
  
  return (
  <div className={classes.image}>
    <img 
      src={`http://localhost:3001/img/cars/${min?'min/':''}${source}`} 
      alt={source} 
      width="300"
      height="175" 
    />
    <p className={classes.title}>{title}</p>
  </div>
)};

export default Image;