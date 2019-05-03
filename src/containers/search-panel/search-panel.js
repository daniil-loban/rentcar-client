import React, { Component } from 'react';
import { connect } from 'react-redux';
import Select from '../../components/UI/select/select';
import classes from './search-panel.css';

import { setFilterOptions } from '../../store/actions/base';
import {
  setSelectedFilter,
  clearFilterSelectedOptions
} from '../../store/actions/filter-options';

const propByPath = {
  model: { key: 'model', label: 'Марка' },
  price: { key: 'price', label: 'Цена(у.е.)' },
  'properties.year': { key: 'year', label: 'Год' },
  'properties.seats': { key: 'seats', label: 'Места' },
  'properties.bags': { key: 'bags', label: 'Багаж' },
  'properties.doors': { key: 'doors', label: 'Двери' },
  'properties.ac': { key: 'ac', label: 'АС' },
  'properties.transmission': { key: 'tms', label: 'Трансмиссия' }
};

class SearchPanel extends Component {
  static defaultProps = {};

  selectChangeHandler = event => {
    const {
      setSelectedFilter: callSetSelectedFilter
      // filteredCars,
      // setFilterOptions: callSetFilterOptions
    } = this.props;
    callSetSelectedFilter(event.target.id, event.target.value);
    // callSetFilterOptions(filteredCars);
  };

  createFilledSelector = (key, label, optionsArr) => {
    const { selectedFilter } = this.props;
    return optionsArr.length > 1 ? (
      <Select
        key={key}
        keyName={key}
        label={label}
        value={selectedFilter[key]}
        onChange={this.selectChangeHandler}
        options={[{ text: '', value: '' }].concat(
          optionsArr.map(e => ({ text: e, value: e }))
        )}
      />
    ) : null;
  };

  handlerOnClickClearFilter = () => {
    const {
      clearFilterSelectedOptions: callClearFilterSelectedOptions,
      cars
    } = this.props;
    callClearFilterSelectedOptions(cars);
  };

  render() {
    if (!this.props) return null;

    const select = [];

    const { cars, filterOptions, searchPanelStyle, filteredCars } = this.props;
    // console.log('PROPS', this.props);

    if (cars && filterOptions) {
      Object.keys(propByPath).forEach(key => {
        select.push(
          this.createFilledSelector(
            propByPath[key].key,
            propByPath[key].label,
            filterOptions[key]
          )
        );
      });
    }

    return (
      <div style={searchPanelStyle} className={classes.searchPanel}>
        {filteredCars.length < cars.length && (
          <button
            className={classes.clearFilter}
            onClick={this.handlerOnClickClearFilter}
            type="submit"
          >
            Сбросить фильтр
          </button>
        )}
        {select}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    cars: state.base.cars,
    filteredCars: state.base.filteredCars,
    filterOptions: state.base.filterOptions,
    selectedFilter: state.filterOptions.selectedFilter
  };
}

const mapDispatchToProps = {
  setFilterOptions,
  setSelectedFilter,
  clearFilterSelectedOptions
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchPanel);
