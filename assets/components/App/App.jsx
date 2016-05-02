import React, { Component } from 'react';
import Router, { Link, RouteHandler } from 'react-router';
import { findDOMNode } from 'react-dom';
import Location from 'services/location';
import moment from 'moment';
import _ from 'lodash';
import Forecast from 'components/Forecast/Forecast';
import BarChart from 'components/BarChart/BarChart';

import {
  getLocality,
  mapWeatherToWeek,
  convert
} from 'services/utils';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      position: {},
      location: {},
      weather: {},
    };
  }

  componentWillMount() {
    Location.init().then(response => {
      response.loading = false;
      this.setState(response);
    });
  }

  render() {
    var state = this.state;

    var location;
    var week = [];

    if (!state.loading) {
      console.log('RENDERING STATE', state);
      location = getLocality(state.location.address_components);
      week = mapWeatherToWeek(state.weather.daily.data);
    }

    return (
      <div>
      {this.state.loading ? 'Loading...' :
        <div>
          <div class="app sunny">
            <div class="summary">
              {state.weather.currently.summary}
            </div>
            <div class="temperature">
              {convert(state.weather.currently.temperature)}<span>°</span>
            </div>
            <div class="location">{location}</div>
            <div class="time">Today, {moment().format('h:mm a')}</div>

            <Forecast ref="forecast" week={week} />

            <BarChart data={state.weather.hourly.data} />
          </div>
        </div>
        }
      </div>
    );
  }
}
