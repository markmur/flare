import axios from 'axios'

export default {
  getForecast(latitude, longitude) {
    return axios.get(
      `https://us-central1-flare-e5b26.cloudfunctions.net/forecast?latitude=${latitude}&longitude=${longitude}`
    )
  }
}
