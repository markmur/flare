const request = require('request');
const weather = require('../fixtures/weather.json');
const API_KEY = sails.config.local.API_KEY || process.env.API_KEY;

module.exports = {
  index: function (req, res) {

    var bundle;

    if (sails.config.environment === 'production') {
      bundle = require('../../assets.json').main.js;
      console.log(bundle);
    }

    return res.view('index', {
      bundle: bundle,
    });
  },

  weather: function (req, res) {

    if (!req.param('latitude') || !req.param('longitude')) {
      return res.badRequest('`latitude` and `longitude` are required parameters');
    }

    var latitude = req.param('latitude');
    var longitude = req.param('longitude');

    var url = `https://api.forecast.io/forecast/${sails.config.local.API_KEY}/${latitude},${longitude}`;

    request(url, (err, response, body) => {
      if (err) {
        return res.serverError(err);
      }

      return res.json(JSON.parse(body));
    });
  },
};
