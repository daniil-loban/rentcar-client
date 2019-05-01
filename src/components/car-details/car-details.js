import React from "react";
import classes from './car-details.css'

const CarDetails = props => {
  return (
  <ul className = {classes.details}>
    <li><i className={classes["stm-rental-seats"]}/><span>{props.seats}</span></li>
    <li><i className={classes["stm-rental-bag"]}/><span>{props.bags}</span></li>
    <li><i className={classes["stm-rental-door"]}/><span>{props.doors}</span></li>
    <li><i className={classes["stm-rental-ac"]}/><span>{props.ac}</span></li>
    <li><i className={classes["stm-icon-transmission"]}/><span>{props.transmission}</span></li>
  </ul>
)}

export default CarDetails;

