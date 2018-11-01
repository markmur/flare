import React, { Component } from 'react'
import ReactTooltip from 'react-tooltip'

import { determineIcon, convert } from '../services/utils'

export default class Forecast extends Component {
  render() {
    return (
      <ul className="forecast">
        {this.props.children}
        {this.props.week.map((day, i) => (
          <div key={day.time}>
            <li
              data-tip
              data-for={`forecast-item-${i}`}
              className="forecast-item"
            >
              <div className="forecast-item--day">{day.time.format('ddd')}</div>
              <div className="forecast-item--icon">
                <i className={determineIcon(day.icon)} />
              </div>
              <div className="forecast-item--temp">
                <strong>{convert(day.temperatureMax, this.props.temp)}</strong>{' '}
                <span>/</span>{' '}
                <span className="min">
                  {convert(day.temperatureMin, this.props.temp)}
                </span>
              </div>
            </li>
            <ReactTooltip id={`forecast-item-${i}`} effect="solid">
              <span>{day.summary}</span>
            </ReactTooltip>
          </div>
        ))}
      </ul>
    )
  }
}
