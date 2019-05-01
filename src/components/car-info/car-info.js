
import React, {Component} from 'react';
import DatePicker from "react-datepicker";
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import CarCard from '../car-card/car-card';
import { NavLink } from 'react-router-dom';

import {
  selectCar, 
  agreeWithConditions,
  rentCar,
  setStartDate,
  setEndDate, 
  setCustomerFirstName,
  setCustomerLastName
} from '../../store/actions/rent'

import classes from "./car-info.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';

class CarInfo extends Component{
  componentDidMount() {
    if (!this.props.cars) {
      this.props.history.push('/');
    }
    this.props.selectCar(this.props.match.params.id-1)
  } 

  handlerOnChangeStartDate = (date) => {
    this.props.setStartDate(date);
  }

  handlerOnChangeEndDate = (date) => {
    this.props.setEndDate(date);
  }

  handlerOnChangeFirstName = (event) => {
    this.props.setCustomerFirstName(event.target.value);
  }

  handlerOnChangeLastName = (event) => {
    this.props.setCustomerLastName(event.target.value);
  }

  handlerOnSubmit = (event) => {
    event.preventDefault();
    console.log('submiting');
    this.props.rentCar({
      carId: this.props.match.params.id-1,
      startDate: this.props.startDate,
      endDate: this.props.endDate,
      userData: {
        firstName: this.props.customerFirstName,
        lastName: this.props.customerLastName,
      }
    });
  }

  render (){
    if (!this.props.cars) return null;

    const car = this.props.cars[this.props.match.params.id-1];
    return (
      <form className={classes.rentForm} onSubmit={this.handlerOnSubmit}>
        <p className ={classes.caption}>Оформление заказа</p>
        <div>
          <CarCard
            model = {car.model}
            price = {car.price}
            properties = {car.properties}
          />
        </div>  
        <div>
          Ваше Имя*&nbsp;
          <input 
            type="text"
            placeholder={"введите ваше имя"}
            value={this.props.customerFirstName}
            onChange ={this.handlerOnChangeFirstName}
          />
        </div>  
        <div>
          Вашa Фамилия*&nbsp; 
          <input
            type="text"
            placeholder={"введите вашу фамилию"}
            value={this.props.customerLastName}
            onChange ={this.handlerOnChangeLastName}
          />
        </div>  
        <div>
        Дата аренды*&nbsp;
        <DatePicker 
          selected={this.props.startDate} 
          selectsStart
          startDate={this.props.startDate}
          endDate={this.props.endDate}
          onChange = {this.handlerOnChangeStartDate}
          dateFormat="dd/MM/yyyy"
          minDate={new Date()}
        />
        </div>
        <div>
        Дата возврата*&nbsp;
        <DatePicker 
          selected={this.props.endDate} 
          selectsEnd
          startDate={this.props.startDate}
          endDate={this.props.endDate}
          onChange = {this.handlerOnChangeEndDate}
          dateFormat="dd/MM/yyyy"
          minDate={this.props.startDate}
        />
        </div>
        {
          this.props.isAgreeWithCondition 
          ? <input type="submit" value="Оформить" disabled={!this.props.isFormValid}/>
          : <NavLink to={'/conditions'}>Подвердите согласие с условиями аренды*</NavLink>
        }
      </form>
    )
  }
}

function mapStateToProps (state) {
  return {
    cars: state.base.cars,
    isAgreeWithCondition: state.rent.isAgreeWithCondition,
    startDate: state.rent.startDate,
    endDate: state.rent.endDate,
    customerFirstName: state.rent.customerFirstName,
    customerLastName: state.rent.customerLastName,
    isFormValid: state.rent.isFormValid
  }
}

function mapDispatchToProps(dispatch) {
  return {
    selectCar:(id) => dispatch(selectCar(id)),
    agreeWithConditions: (isAgree) =>dispatch(agreeWithConditions(isAgree)),
    rentCar:(data) => dispatch(rentCar(data)),
    setStartDate:(date) => dispatch(setStartDate(date)),
    setEndDate:(date) => dispatch(setEndDate(date)), 
    setCustomerFirstName:(firstName) => dispatch(setCustomerFirstName(firstName)),
    setCustomerLastName:(lastName) => dispatch(setCustomerLastName(lastName)) 
  }
}

export default  withRouter(connect(mapStateToProps, mapDispatchToProps)(CarInfo));