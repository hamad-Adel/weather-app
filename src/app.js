const path = require('path');

const express = require('express'),
  app = express();

// tell express which templating engine we will use
app.set('view engine', 'hbs');

// customization tell express where to serve static pages
app.use(express.static(path.join(__dirname, '../public')))

// Routes

app.get('/weather', (req, res) => {
  res.send({ forecast: 'clear', location: 'Egypt' });
})

// Trigger the server
app.listen(3000, () => console.log('Server is up on port 3000'));