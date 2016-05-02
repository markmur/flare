import React, { Component } from 'react';
import moment from 'moment';

import {
  determineWeatherFromIcon,
  convert
} from 'services/utils';

export default class Forecast extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ul class="forecast">
        {this.props.week.map(day =>
          <li key={day.time} class="forecast-item">
            <div class="forecast-item--day">{day.time.format('ddd')}</div>
            <div class="forecast-item--icon"><i class={determineWeatherFromIcon(day.icon)}></i></div>
            <div class="forecast-item--temp">
              <strong>{convert(day.temperatureMax)}</strong> <span>/</span> <span class="min">{convert(day.temperatureMin)}</span>
            </div>
          </li>
        )}
      </ul>
    );
  }
}
