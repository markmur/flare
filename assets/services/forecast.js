import { ajax } from 'jquery';

const API_KEY = '6b462363cf4aa14c736f1b1460fcf06b';

export default {

  getForecast(latitude, longitude) {
    var url = `https://api.forecast.io/forecast/${API_KEY}/${latitude},${longitude}`;

    return ajax({
      url: url,
      dataType: 'jsonp'
    });
  }

}
