import 'whatwg-fetch';

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
  }
};

export default {

  init() {
    var cachedPosition = this.getStoredPosition();

    if (!cachedPosition) {

      return new Promise(resolve => {
        this.getPosition().then(position => {
          this.getLocationAndWeather(
            position.coords.latitude,
            position.coords.longitude
        ).then(res => {
          res.position = position;
          return resolve(res);
        });
        });
      });

    } else {

      return this.getLocationAndWeather(
        cachedPosition.coords.latitude,
        cachedPosition.coords.longitude
      ).then(res => {
        return new Promise(resolve => {
          res.position = cachedPosition;
          resolve(res);
        });
      });

    }
  },

  getLocationAndWeather(lat, lng) {
    return Promise.all([
      this.getLocation(lat, lng),
      this.getWeather(lat, lng),
    ]).then(responses => new Promise(resolve =>
      resolve({
        location: responses[0].results[0],
        weather: responses[1],
      })
    ));
  },

  getPosition() {

    return new Promise((resolve, reject) => {

      // return resolve(cities.LA);

      navigator.geolocation.getCurrentPosition(position => {

        var { latitude, longitude } = position.coords;

        console.debug('[Location]', position);

        this.updatePosition(position, resolve);

      }, err => {

        console.error(err);
        return reject(err);
      });
    });
  },

  getStoredPosition() {
    return JSON.parse(localStorage.getItem('position'));
  },

  getLocation(latitude, longitude) {
    // Google Maps Geodecoder
    var url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}`;

    return fetch(url).then(res => res.json());
  },

  getWeather(latitude, longitude) {
    return new Promise((resolve, reject) => {
      io.socket.get(`/weather?latitude=${latitude}&longitude=${longitude}`, (res, jwr) => {
        console.debug('[Weather]', res);
        resolve(res);
      });
    });
  },

  ////////////////////////////
  //    UPDATE METHODS     //
  //////////////////////////

  updatePosition(position, callback) {
    localStorage.setItem('position', JSON.stringify({
      coords: {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      },
      timestamp: position.timestamp,
    }));

    if (callback) callback(position);
  },
};
