import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import { withRouter, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import CarCard from '../car-card/car-card';
import classes from './order-car.css';

import {
  selectCar,
  agreeWithConditions,
  rentCar,
  setStartDate,
  setEndDate,
  setCustomerFirstName,
  setCustomerLastName
} from '../../store/actions/rent';
import {RENT_CAR_SUCCESS, RENT_CAR_ERROR} from '../../store/actions/actionTypes.ts'

import { showModal } from '../../store/actions/modal';

class OrderCar extends Component {
  componentDidMount() {
    const { cars, history, selectCar: callSelectCar, match } = this.props;
    if (!cars) {
      history.push('/');
    }
    callSelectCar(match.params.id - 1);
  }

  handlerOnChangeStartDate = date => {
    const { setStartDate: callSetStartDate } = this.props;
    callSetStartDate(date);
  };

  handlerOnChangeEndDate = date => {
    const { setEndDate: callsetEndDate } = this.props;
    callsetEndDate(date);
  };

  handlerOnChangeFirstName = event => {
    const { setCustomerFirstName: callSetCustomerFirstName } = this.props;
    callSetCustomerFirstName(event.target.value);
  };

  handlerOnChangeLastName = event => {
    const { setCustomerLastName: callSetCustomerLastName } = this.props;
    callSetCustomerLastName(event.target.value);
  };

  handlerOnSubmit = event => {
    event.preventDefault();
    const {
      rentCar: callRentCar,
      match,
      startDate,
      endDate,
      customerFirstName,
      customerLastName
    } = this.props;

    callRentCar({
      carId: match.params.id - 1,
      startDate,
      endDate,
      userData: {
        firstName: customerFirstName,
        lastName: customerLastName
      }
    }).then(response => {
      const { showModal: showModalAction, history} = this.props;
      switch (response.type) {
        case RENT_CAR_SUCCESS:
          showModalAction('Заказ принят');
          history.push('/park');
          break;
        case RENT_CAR_ERROR:
          showModalAction('Ошибка сервера');
          history.push('/park');
          break;
        default:
          break;
      }
    });
  };

  render() {
    const {
      isAgreeWithCondition,
      customerFirstName,
      customerLastName,
      startDate,
      endDate,
      isFormValid,
      cars,
      match
    } = this.props;

    if (!cars) return null;
    const car = cars[match.params.id - 1];
    return (
      <form className={classes.rentForm} onSubmit={this.handlerOnSubmit}>
        <p className={classes.rentForm__caption}>Оформление заказа</p>
        <div>
          <CarCard
            model={car.model}
            price={car.price}
            properties={car.properties}
          />
        </div>
        <div>
          Ваше Имя*&nbsp;
          <input
            type="text"
            placeholder="введите ваше имя"
            value={customerFirstName}
            onChange={this.handlerOnChangeFirstName}
          />
        </div>
        <div>
          Вашa Фамилия*&nbsp;
          <input
            type="text"
            placeholder="введите вашу фамилию"
            value={customerLastName}
            onChange={this.handlerOnChangeLastName}
          />
        </div>
        <div>
          Дата аренды*&nbsp;
          <DatePicker
            selected={startDate}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            onChange={this.handlerOnChangeStartDate}
            dateFormat="dd/MM/yyyy"
            minDate={new Date()}
          />
        </div>
        <div>
          Дата возврата*&nbsp;
          <DatePicker
            selected={endDate}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            onChange={this.handlerOnChangeEndDate}
            dateFormat="dd/MM/yyyy"
            minDate={startDate}
          />
        </div>
        {isAgreeWithCondition ? (
          <input type="submit" value="Оформить" disabled={!isFormValid} />
        ) : (
          <NavLink to="/conditions">
            Подвердите согласие с условиями аренды*
          </NavLink>
        )}
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    cars: state.base.cars,
    isAgreeWithCondition: state.rent.isAgreeWithCondition,
    startDate: state.rent.startDate,
    endDate: state.rent.endDate,
    customerFirstName: state.rent.customerFirstName,
    customerLastName: state.rent.customerLastName,
    isFormValid: state.rent.isFormValid,
    isRented: state.rent.isRented
  };
}

function mapDispatchToProps(dispatch) {
  return {
    selectCar: id => dispatch(selectCar(id)),
    agreeWithConditions: isAgree => dispatch(agreeWithConditions(isAgree)),
    rentCar: data => dispatch(rentCar(data)),
    setStartDate: date => dispatch(setStartDate(date)),
    setEndDate: date => dispatch(setEndDate(date)),
    setCustomerFirstName: firstName =>
      dispatch(setCustomerFirstName(firstName)),
    setCustomerLastName: lastName => dispatch(setCustomerLastName(lastName)),
    showModal: (caption, children, action) =>
      dispatch(showModal(caption, children, action))
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(OrderCar)
);
