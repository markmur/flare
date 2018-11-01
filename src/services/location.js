import forecast from './forecast'

const cities = {
  LA: {
    coords: {
      latitude: 33.9979826,
      longitude: -118.4577739
    }
  },
  SF: {
    coords: {
      latitude: 37.75767,
      longitude: -122.50764
    }
  },
  Barbados: {
    coords: {
      latitude: 13.1900945,
      longitude: -59.6756503
    }
  },
  Miami: {
    coords: {
      latitude: 25.7823072,
      longitude: -80.3011204
    }
  },
  NY: {
    coords: {
      latitude: 40.7053111,
      longitude: -74.2581875
    }
  },
  Seychelles: {
    coords: {
      latitude: -4.6838005,
      longitude: 55.3794376
    }
  },
  Rio: {
    coords: {
      latitude: -22.9109878,
      longitude: -43.728526
    }
  }
}

export default {
  init() {
    return new Promise(resolve => {
      this.getPosition().then(position => {
        this.getLocationAndWeather(
          position.coords.latitude,
          position.coords.longitude
        ).then(res => {
          res.position = position
          return resolve(res)
        })
      })
    })
  },

  getCachedPosition() {
    const cachedPosition = this.getStoredPosition()

    return this.getLocationAndWeather(
      cachedPosition.coords.latitude,
      cachedPosition.coords.longitude
    ).then(res => {
      return new Promise(resolve => {
        res.position = cachedPosition
        resolve(res)
      })
    })
  },

  getLocationAndWeather(lat, lng) {
    return Promise.all([
      this.getLocation(lat, lng),
      this.getWeather(lat, lng)
    ]).then(
      responses =>
        new Promise(resolve =>
          resolve({
            location: responses[0].results[0],
            weather: responses[1]
          })
        )
    )
  },

  getPosition() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        position => {
          this.updatePosition(position, resolve)
        },
        err => {
          console.error(err)
          return reject(err)
        }
      )
    })
  },

  getStoredPosition() {
    return JSON.parse(localStorage.getItem('position'))
  },

  getLocation(latitude, longitude) {
    // Google Maps Geodecoder
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}`

    return fetch(url).then(res => res.json())
  },

  getWeather(latitude, longitude) {
    return new Promise((resolve, reject) => {
      forecast
        .getForecast(latitude, longitude)
        .then(res => {
          resolve(res)
        })
        .catch(reject)
    })
  },

  updatePosition(position, callback) {
    localStorage.setItem(
      'position',
      JSON.stringify({
        coords: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        },
        timestamp: position.timestamp
      })
    )

    if (callback) callback(position)
  }
}
