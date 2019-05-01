import React, { Component } from 'react'
import CarDetails from '../car-details/car-details'
import Image from '../UI/Image/Image'
import classes from './car-card.css'
import PropTypes from 'prop-types';

export default class CarCard extends Component {
  render() {
    const {seats, bags, doors, ac, transmission, "photo-min": photoMin, year} = this.props.properties;
    return (
      <div className = {classes.carCard}>
        <h2 className = {classes.caption}>
          {this.props.model}&nbsp;
          <span className = {classes.year}>
            {year}
          </span>
        </h2>

        <h2 className={classes.price}>
          Цены начиная от:&nbsp;<span className={classes["price-value"]} >{this.props.price}$</span>/сутки
        </h2>  
        <div className={classes.cardInfo}>
          <Image 
            source={photoMin}
            min
            title = {transmission==="M"?"Механика":"Автомат"}
          />
          <CarDetails 
            seats = {seats}
            bags = {bags}
            doors = {doors}
            ac = {ac}
            transmission = {transmission}
          />
        </div>
      </div>
    )
  }
}

CarCard.propTypes = {
  model: PropTypes.string.isRequired,
  properties: PropTypes.shape({
    seats: PropTypes.number.isRequired,
    bags:  PropTypes.number.isRequired,
    doors: PropTypes.number.isRequired,
    ac: PropTypes.string.isRequired,
    transmission: PropTypes.oneOf(['M', 'A']).isRequired,
  })

}