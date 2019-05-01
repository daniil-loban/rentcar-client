import React, { Component, Fragment } from 'react';
import {withRouter} from 'react-router-dom';
import CarCard from '../../components/car-card/car-card'
import classes from './car-list.css'
import {connect} from 'react-redux'
import NavLink from '../../hoc/navlink'

class CarList extends Component { 
  render() {
    
    return (
    <div className={classes.content}>
      { !this.props.loading && this.props.filteredCars
      ? this.props.filteredCars.map((car) => {
        return (
          <Fragment key={car.id}>
            <NavLink to={'/car/' + car.id} color="black">
              <CarCard
                model = {car.model}
                price = {car.price}
                properties = {car.properties}
              />
            </NavLink>
          </Fragment>)
        })
      : this.props.error && <h2>{"Серврер не доступен"}</h2>
    }
    </div>
    )
  }
}

function mapStateToProps(state){
  return {
    filteredCars: state.base.filteredCars,
    loading: !!state.base.loading,
    error: state.base.error
  } 
}

export default withRouter(connect(mapStateToProps)(CarList));