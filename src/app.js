// Path native node module
const path = require('path');

// Express framework
const express = require('express');
const app = express();
// handlebar templating enngine
const hbs = require('hbs');

// forecast and geocode helpers
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

// tell express which templating engine we will use
app.set('view engine', 'hbs');
// customization tell express where to serve static pages
app.use(express.static(path.join(__dirname, '../public')))

const partialsPath = path.join(__dirname, '../views/partials');
hbs.registerPartials(partialsPath);

// Routes
app.get('', (req, res) => {
  res.render('index', { title: 'Weather App', version: 1.0, by: 'Hamad adel' });
});

app.get('/weather', (req, res) => {
  const address = req.query.address;
  if (!address)
    return res.send({ error: 'you must provide your address' });

  geocode(address, (error, { latitude, longitude, location }) => {
    if (error)
      return res.send({ error });
    forecast(latitude, longitude, 'en', (forecastError, forecast) => {
      if (forecastError)
        return res.send({ error: forecastError });
      res.send({ forecast, location, address });
    })
  });
});

// Trigger the server
app.listen(3000, () => console.log('Server is up on port 3000'));