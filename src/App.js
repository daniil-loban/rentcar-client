import React, { Component, Fragment } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import CarList from './containers/car-list/car-list';
import OrderCar from './components/order-car/order-car';
import Header from './components/header/header';
import SearchPanel from './containers/search-panel/search-panel';
import classes from './App.css';
import { fetchCars } from './store/actions/base';
import Contacts from './containers/contacts/contacts';
import Main from './containers/main/main';
import Conditions from './components/conditions/conditions';
import ModalDialog from './containers/modal-dialog/modal-dialog';

class App extends Component {
  state = {
    headerStyles: classes.header
  };

  async componentDidMount() {
    const { fetchCars: callfetchCars } = this.props;
    callfetchCars();
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = (/* event */) => {
    const cls = [classes.header];
    if (window.pageYOffset > this.headerRef.offsetTop + 300) {
      cls.push(classes.sticky);
    }

    const { headerStyles } = this.state;

    if (headerStyles !== cls.join(' ')) {
      this.setState({ headerStyles: cls.join(' ') });
    }
  };

  render() {
    const headerContent = (
      <Switch>
        <Route path="/car/:id" component={null} />
        <Route path="/park" component={SearchPanel} />
        <Route path="/conditions" component={null} />
        <Route path="/contacts" component={null} />
        <Route path="/" exact component={null} />
        <Redirect to="/" />
      </Switch>
    );
    const mainContent = (
      <Switch>
        <Route path="/car/:id" component={OrderCar} />
        <Route path="/park" component={CarList} />
        <Route path="/conditions" component={Conditions} />
        <Route path="/contacts" component={Contacts} />
        <Route path="/" exact component={Main} />
        <Redirect to="/" />
      </Switch>
    );
    const { headerStyles } = this.state;
    const { isVisible } = this.props;
    return (
      <Fragment>
        <ModalDialog caption="Hello" isVisible={isVisible}>
          <p>Some text in modal</p>
        </ModalDialog>
        <div className="App">
          <div className={headerStyles}>
            <Header
              headerRef={el => {
                this.headerRef = el;
                return null;
              }}
              title="RENTCAR"
            >
              {headerContent}
            </Header>
          </div>
          <main>{mainContent}</main>
        </div>
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    cars: state.base.cars,
    loading: !!state.base.loading,
    error: state.base.error,
    isVisible: state.modal.isVisible
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchCars: () => dispatch(fetchCars())
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
    null,
    { forwardRef: true }
  )(App)
);
