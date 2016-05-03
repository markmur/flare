import React, { Component } from 'react';
import moment from 'moment';
import ReactTooltip from 'react-tooltip';

import {
  determineIcon,
  convert
} from 'services/utils';

export default class Forecast extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ul class="forecast">
        {this.props.week.map((day, i) =>
          <div>
          <li data-tip data-for={`forecast-item-${i}`} key={day.time} class="forecast-item">
            <div class="forecast-item--day">{day.time.format('ddd')}</div>
            <div class="forecast-item--icon"><i class={determineIcon(day.icon)}></i></div>
            <div class="forecast-item--temp">
              <strong>{convert(day.temperatureMax)}</strong> <span>/</span> <span class="min">{convert(day.temperatureMin)}</span>
            </div>
          </li>
          <ReactTooltip id={`forecast-item-${i}`} effect='solid'>
            <span>{day.summary}</span>
          </ReactTooltip>
          </div>
        )}
      </ul>
    );
  }
}
