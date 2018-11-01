import axios from 'axios'

const API_KEY = '6b462363cf4aa14c736f1b1460fcf06b'

export default {
  getForecast(latitude, longitude) {
    const url = `https://api.forecast.io/forecast/${API_KEY}/${latitude},${longitude}`

    return axios.get(url)
  }
}
