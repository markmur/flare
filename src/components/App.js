import React, { Component } from 'react'
import { hot } from 'react-hot-loader'
import moment from 'moment'
import classNames from 'classnames'

import {
  getLocality,
  mapWeatherToWeek,
  convert,
  determineWeather
} from '../services/utils'
import Location from '../services/location'

import Forecast from './Forecast'
import BarChart from './BarChart'
import Loader from './Loader'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: true,
      location: {},
      weather: {},
      temp: (() => {
        return localStorage.getItem('tempPreference') || 'c'
      })()
    }
  }

  componentDidMount() {
    Location.init().then(response => {
      this.setState({
        loading: false,
        ...response
      })
    })
  }

  setTemp(temp) {
    this.setState(
      {
        temp
      },
      () => {
        localStorage.setItem('tempPreference', temp)
      }
    )
  }

  render() {
    const { loading, temp } = this.state

    let location
    let week = []

    if (!loading) {
      location = getLocality(this.state.location.address_components)
      week = mapWeatherToWeek(this.state.weather.daily.data)
    }

    return (
      <div>
        {this.state.loading ? (
          <Loader loading />
        ) : (
          <div>
            <div
              className={classNames(
                'app',
                determineWeather(this.state.weather.currently.icon)
              )}
            >
              <div className="temp-toggle">
                <span
                  className={classNames({ active: temp === 'c' })}
                  onClick={() => this.setTemp('c')}
                >
                  C
                </span>
                <em>/</em>
                <span
                  className={classNames({ active: temp === 'f' })}
                  onClick={() => this.setTemp('f')}
                >
                  F
                </span>
              </div>

              <div className="summary">
                {this.state.weather.currently.summary}
              </div>

              <div className="temperature">
                {convert(this.state.weather.currently.temperature, temp)}
                <span>°</span>
              </div>

              <div className="location">{location}</div>

              <p>{this.state.weather.daily.summary}</p>

              <div className="time">Today, {moment().format('h:mm a')}</div>

              <Forecast temp={temp} week={week} />

              <BarChart temp={temp} data={this.state.weather.hourly.data} />
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default hot(module)(App)
