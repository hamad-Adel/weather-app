const request = require('request');

// Geocoding
// Address -> lat/lng -> weather
const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiaGFtYWRhZGVsIiwiYSI6ImNrMGd6c3Z0dTBkNWwzYm8xYzZhY3o1cWoifQ.h-bM-ySZaJVCjW9rvz6PrA&limit=1`;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to location service', undefined)
    } else if (body.features.length === 0) {
      callback('Unable to find location, Try another search', undefined)
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name
      });
    }
  })
}

module.exports = geocode;

