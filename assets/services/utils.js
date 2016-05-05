import moment from 'moment';

export function convert(val, round) {
  val = String((val - 32) * 5 / 9);

  if (typeof round !== 'undefined' && round === false) return val;
  else return Math.round(val);
}

export function getLocality(addresses) {
  var locality = _.find(addresses, item => item.types.indexOf('locality') > -1);

  return locality.long_name;
}

export function mapWeatherToWeek(weather) {
  var hours = 24;
  var days = [];
  var day;

  for (var i = 0; i < weather.length; i++) {
    day = weather[i];
    day.time = moment().add(hours, 'hours');
    days.push(day);
    hours += 24;
  }

  return days;
}

export function determineWeather(icon = '') {
  icon = icon.toLowerCase();

  switch (true) {
    case /rain/.test(icon):
      return 'raining';
    case /snow/.test(icon):
      return 'snowing';
    case /sleet/.test(icon):
      return 'snowing';
    case /fog/.test(icon):
      return 'foggy';
    case /wind/.test(icon):
      return 'windy';
    case /cloudy/.test(icon):
      return 'cloudy';
    case /partly\-cloudy/.test(icon):
      return 'partly-cloudy';
    case /clear\-day/.test(icon):
      return 'clear-day';
    case /clear\-night/.test(icon):
      return 'clear-night';
  }
}

export function determineIcon(icon = '') {
  icon = icon.toLowerCase();

  switch (true) {
    case /rain/.test(icon):
      return 'icon-cloud-rain2';
    case /snow/.test(icon):
      return 'icon-cloud-snow2';
    case /cloudy/.test(icon):
      return 'icon-cloud2';
    case /sleet/.test(icon):
      return 'icon-snow';
    case /fog/.test(icon):
      return 'icon-cloud-fog2';
    case /wind/.test(icon):
      return 'icon-wind';
    case /partly\-cloudy/.test(icon):
      return 'icon-cloud-sun2';
    case /clear\-day/.test(icon):
      return 'icon-sun2';
    case /clear\-night/.test(icon):
      return 'icon-stars2';
  }
}
