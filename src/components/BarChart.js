import React, { Component } from 'react'
import moment from 'moment'
import { convert } from '../services/utils'

export default class BarChart extends Component {
  normaliseData(data) {
    const temperatures = data.map(hour => hour.temperature)

    const ratio = Math.max(...temperatures) / 100

    for (let i = 0; i < temperatures.length; i++) {
      data[i].percent = Math.round(temperatures[i] / ratio)
    }
  }

  render() {
    this.normaliseData(this.props.data)

    return (
      <div className="BarChart">
        <ul className="bars">
          {this.props.data.map((hour, i) => (
            <li key={hour.time} className="bar-item">
              <div className="bar" style={{ height: `${hour.percent}%` }}>
                <span className="time">
                  {moment()
                    .add(i + 1, 'hours')
                    .format('ha')}
                </span>
                <span className="temp">
                  {convert(hour.temperature, this.props.temp)}
                  <span className="deg">°</span>
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}
