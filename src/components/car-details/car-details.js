import React from 'react';
import classes from './car-details.css';

const CarDetails = props => {
  const { seats, bags, doors, ac, transmission } = props;
  return (
    <ul className={classes.details}>
      <li className={classes.details__item}>
        <i className={classes['stm-rental-seats']} />
        <span>{seats}</span>
      </li>
      <li className={classes.details__item}>
        <i className={classes['stm-rental-bag']} />
        <span>{bags}</span>
      </li>
      <li className={classes.details__item}>
        <i className={classes['stm-rental-door']} />
        <span>{doors}</span>
      </li>
      <li className={classes.details__item}>
        <i className={classes['stm-rental-ac']} />
        <span>{ac}</span>
      </li>
      <li className={classes.details__item}>
        <i className={classes['stm-icon-transmission']} />
        <span>{transmission}</span>
      </li>
    </ul>
  );
};

export default CarDetails;
