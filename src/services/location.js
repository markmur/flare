import forecast from './forecast'

export const getForecast = () => {
  return getPosition().then(position => {
    const { latitude, longitude } = position.coords

    return getWeather(latitude, longitude).then(weather => ({
      position,
      weather
    }))
  })
}

const getPosition = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject)
  })
}

const getWeather = (latitude, longitude) =>
  forecast.getForecast(latitude, longitude).then(({ data }) => data)
