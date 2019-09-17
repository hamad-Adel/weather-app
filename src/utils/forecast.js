const request = require('request');

const forecast = (latitude, longitude, lang, callback) => {
  url = `https://api.darksky.net/forecast/ef83710bf9c5bb66663b6272bf45ff0b/${latitude},${longitude}?units=si&lang=${lang}`;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to weather service', undefined);
    } else if (body.error) {
      callback('Unable to find location');
    } else {
      callback(undefined, {
        summary: body.daily.data[0].summary,
        // from: body.timezone,
        temperature: body.currently.temperature,
        precipProbability: body.currently.precipProbability
      });
    }
  });
}

module.exports = forecast;

