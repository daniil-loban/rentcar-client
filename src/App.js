import React, { Component } from 'react';
import {Route, Switch, Redirect, withRouter} from 'react-router-dom';
import CarList from './containers/car-list/car-list'
import CarInfo from './components/car-info/car-info'
import Header from './components/header/header'
import SearchPanel from './containers/search-panel/search-panel'
import classes from './App.css';
import {fetchCars} from './store/actions/base'
import {connect} from 'react-redux'
import Contacts from './containers/contacts/contacts'
import Main from './containers/main/main'
import Conditions from './components/conditions/conditions'


class App extends Component {

  state = {
    headerStyles: classes.header,
    offsetY:0
  }

  async componentDidMount() {
    this.props.fetchCars()
    window.addEventListener('scroll', this.handleScroll);
  }
  
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = (event) => {
    const cls = [classes.header]
    this.setState(
      {offsetY: window.pageYOffset}
    )

    if (window.pageYOffset > this.headerRef.offsetTop+300) {
      cls.push(classes.sticky)  
    }
    if (this.state.headerStyles !== cls.join(' ')){
      this.setState(
        {headerStyles:cls.join(' ')}
      )
    }
  }

  render() {
    let headerContent = (
      <Switch>
        <Route path="/car/:id" component={null}/>
        <Route path="/park" component={SearchPanel}/>
        <Route path="/conditions" component={null}/>
        <Route path="/contacts" component={null}/>
        <Route path="/" exact component={null}/>
        <Redirect to='/'/>
      </Switch>  
    ) 
    let mainContent = (
      <Switch>
        <Route path="/car/:id" component={CarInfo}/>
        <Route path="/park" component={CarList}/>
        <Route path="/conditions" component={Conditions}/>
        <Route path="/contacts" component={Contacts}/>
        <Route path="/" exact component={Main}/>
        <Redirect to='/'/>
      </Switch>  
    )

    return (
      <div className="App">
        <div className={this.state.headerStyles}>
          <Header headerRef={el => this.headerRef = el} title="RENTCAR"> 
            {headerContent}
          </Header>     
        </div>   
        <main>
          {mainContent} 
        </main>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    cars: state.base.cars,
    loading: !!state.base.loading,
    error: state.base.error
  } 
}

function mapDispatchToProps(dispatch) {
  return {
    fetchCars:() => dispatch(fetchCars())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(App));