import React from 'react';
import classes from './image.css'
const Image = props => (
  <div className={classes.image}>
    <img 
      src={`http://localhost:3001/cars/img/${props.min?'min/':''}${props.source}`} 
      alt={props.source} 
      width="300"
      height="175" 
    />
    <p className={classes.title}>{props.title}</p>
  </div>
);

export default Image;