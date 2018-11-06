import get from 'lodash.get'
import Api from './api'

const getPosition = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject)
  })
}

export const getForecast = () => {
  return getPosition().then(position => {
    const { latitude, longitude } = position.coords

    return Promise.all([
      Api.getForecast(latitude, longitude),
      Api.getLocationFromCoords(latitude, longitude)
    ]).then(([weather, location]) => ({
      weather,
      location: get(location, 'results.0.formatted_address')
    }))
  })
}
