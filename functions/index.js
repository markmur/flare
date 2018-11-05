const axios = require('axios')
const functions = require('firebase-functions')

const fetchForecast = (latitude, longitude) => {
  const url = `https://api.forecast.io/forecast/${
    functions.config().flare.api_key
  }/${latitude},${longitude}`

  return axios.get(url)
}

const handleError = res => error => {
  console.error(error.response.data)

  return res.send(error.response.data)
}

exports.forecast = functions.https.onRequest((req, res) => {
  console.log(req.query)
  const { latitude, longitude } = req.query

  res.set('Access-Control-Allow-Origin', 'https://flare-e5b26.firebaseapp.com')

  return fetchForecast(latitude, longitude)
    .then(({ data }) => res.send(data))
    .catch(handleError(res))
})
