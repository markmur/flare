import React, { Component } from 'react';
import Router, { Link, RouteHandler } from 'react-router';
import { findDOMNode } from 'react-dom';
import Location from 'services/location';
import moment from 'moment';
import _ from 'lodash';
import Forecast from 'components/Forecast/Forecast';
import BarChart from 'components/BarChart/BarChart';
import classNames from 'classnames';

import {
  getLocality,
  mapWeatherToWeek,
  convert,
  determineWeather
} from 'services/utils';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      position: {},
      location: {},
      weather: {},
      temp: 'f'
    };
  }

  componentWillMount() {
    Location.init().then(response => {
      response.loading = false;
      this.setState(response);
    });
  }

  setTemp(temp) {
    this.setState({
      temp
    });
  }

  render() {
    var state = this.state;

    var location;
    var week = [];

    if (!state.loading) {
      location = getLocality(state.location.address_components);
      week = mapWeatherToWeek(state.weather.daily.data);
    }

    return (
      <div>
      {this.state.loading ? 'Loading...' :
        <div>
          <div class={classNames('app', determineWeather(state.weather.currently.icon))}>
            <div class="temp-toggle">
              <span onClick={() => this.setTemp('c')} class={classNames({active: this.state.temp === 'c'})}>C</span>
              <em>/</em>
              <span onClick={() => this.setTemp('f')} class={classNames({active: this.state.temp === 'f'})}>F</span>
            </div>
            <div class="summary">
              {state.weather.currently.summary}
            </div>
            <div class="temperature" onClick={() => this.toggleTemp()}>
              {convert(state.weather.currently.temperature, state.temp)}<span>°</span>
            </div>
            <div class="location">{location}</div>
            <p>{this.state.weather.daily.summary}</p>
            <div class="time">Today, {moment().format('h:mm a')}</div>
            <Forecast ref="forecast" temp={state.temp} week={week} />
            <BarChart temp={state.temp} data={state.weather.hourly.data} />
          </div>
        </div>}
      </div>
    );
  }
}
