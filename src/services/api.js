import axios from 'axios'

const returnData = response => response.data

export default {
  getLocationFromCoords(latitude, longitude) {
    return axios
      .get(
        `https://us-central1-flare-e5b26.cloudfunctions.net/location?latitude=${latitude}&longitude=${longitude}`
      )
      .then(returnData)
  },
  getForecast(latitude, longitude) {
    return axios
      .get(
        `https://us-central1-flare-e5b26.cloudfunctions.net/forecast?latitude=${latitude}&longitude=${longitude}`
      )
      .then(returnData)
  }
}
