import React, { Component } from 'react';
import { convert } from 'services/utils';
import moment from 'moment';

export default class BarChart extends Component {
  constructor(props) {
    super(props);
  }

  normaliseData(data) {
    var temperatures = data.map(hour => hour.temperature);

    var ratio = Math.max.apply(Math, temperatures) / 100;

    for (var i = 0; i < temperatures.length; i++) {
      data[i].percent = Math.round(temperatures[i] / ratio);
    }
  }

  render() {

    this.normaliseData(this.props.data);

    return (
      <div class="BarChart">
        <ul class="bars">
          {this.props.data.map((hour, i) =>
            <li key={hour.time} class="bar-item">
              <div class="bar" style={{ height: `${hour.percent}%` }}>
                <span class="time">{moment().add(i + 1, 'hours').format('ha')}</span>
                <span class="temp">
                  {convert(hour.temperature, this.props.temp)}<span class="deg">°</span>
                </span>
              </div>
            </li>
          )}
        </ul>
      </div>
    );
  }
}
