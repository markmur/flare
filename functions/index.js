const axios = require('axios')
const functions = require('firebase-functions')

const APP_URL = 'https://flare-e5b26.firebaseapp.com'

const { maps, flare } = functions.config()

const fetchForecast = (latitude, longitude) => {
  const url = `https://api.forecast.io/forecast/${
    flare.api_key
  }/${latitude},${longitude}`

  return axios.get(url)
}

const getLocationFromCoords = (latitude, longitude) => {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${
    maps.api_key
  }`
  return axios.get(url)
}

const handleError = res => error => {
  console.error(error.response.data)

  return res.send(error.response.data)
}

exports.forecast = functions.https.onRequest((req, res) => {
  console.log('forecast', req.query)
  const { latitude, longitude } = req.query

  res.set('Access-Control-Allow-Origin', APP_URL)

  return fetchForecast(latitude, longitude)
    .then(({ data }) => res.send(data))
    .catch(handleError(res))
})

exports.location = functions.https.onRequest((req, res) => {
  console.log('location', req.query)
  const { latitude, longitude } = req.query

  res.set('Access-Control-Allow-Origin', APP_URL)

  return getLocationFromCoords(latitude, longitude)
    .then(({ data }) => res.send(data))
    .catch(handleError(res))
})
