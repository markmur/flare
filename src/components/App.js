import React, { Component } from 'react'
import { hot } from 'react-hot-loader'
import moment from 'moment'
import classNames from 'classnames'

import { mapWeatherToWeek, convert, determineWeather } from '../services/utils'
import { getForecast } from '../services/location'

import Forecast from './Forecast'
import BarChart from './BarChart'
import Loader from './Loader'

class App extends Component {
  state = {
    loading: true,
    weather: {},
    tempPreference: (() => {
      return localStorage.getItem('tempPreference') || 'c'
    })()
  }

  async componentDidMount() {
    const { weather } = await getForecast()
    this.setState(() => ({
      loading: false,
      weather
    }))
  }

  setTemp(tempPreference) {
    this.setState(
      () => ({
        tempPreference
      }),
      () => {
        localStorage.setItem('tempPreference', tempPreference)
      }
    )
  }

  render() {
    const { loading, tempPreference, weather } = this.state

    if (loading) return <Loader loading />

    const week = mapWeatherToWeek(weather.daily.data)

    return (
      <div
        className={classNames('app', determineWeather(weather.currently.icon))}
      >
        <div className="temp-toggle">
          <span
            className={classNames({ active: tempPreference === 'c' })}
            onClick={() => this.setTemp('c')}
          >
            C
          </span>
          <em>/</em>
          <span
            className={classNames({ active: tempPreference === 'f' })}
            onClick={() => this.setTemp('f')}
          >
            F
          </span>
        </div>

        <div className="summary">{weather.currently.summary}</div>
        <div className="temperature">
          {convert(weather.currently.temperature, tempPreference)}
          <span>°</span>
        </div>
        <div className="location">
          {weather.timezone.slice(weather.timezone.lastIndexOf('/') + 1)}
        </div>
        <p>{weather.daily.summary}</p>
        <div className="time">Today, {moment().format('h:mm a')}</div>
        <Forecast temp={tempPreference} week={week} />
        <BarChart temp={tempPreference} data={weather.hourly.data} />
      </div>
    )
  }
}

export default hot(module)(App)
