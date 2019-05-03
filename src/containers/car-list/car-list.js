import React, { Fragment } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import CarCard from '../../components/car-card/car-card';
import classes from './car-list.css';

const CarList = props => {
  const { loading, error, filteredCars } = props;
  return (
    <div className={classes.car_list}>
      {!loading && filteredCars
        ? filteredCars.map(car => {
            return (
              <Fragment key={car.id}>
                <NavLink
                  className={classes.car_list__item}
                  to={`/car/${car.id}`}
                >
                  <CarCard
                    model={car.model}
                    price={car.price}
                    properties={car.properties}
                  />
                </NavLink>
              </Fragment>
            );
          })
        : error && <h2>Серврер не доступен</h2>}
    </div>
  );
};

function mapStateToProps(state) {
  return {
    filteredCars: state.base.filteredCars,
    loading: !!state.base.loading,
    error: state.base.error
  };
}

export default withRouter(connect(mapStateToProps)(CarList));
