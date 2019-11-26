const express = require('express');
const app = express();
const request = require('request');

require('dotenv').config()

app.use('/', express.static('public'));

app.get('/clans/:clanID', function(req, res) {
  const id = req.params.clanID;
  
  const options = {
    url: 'https://api.brawlhalla.com/clan/' + id,
    method: 'GET',
    headers: {
      api_key: process.env.APIKEY
    }
  }
  
  request(options, function (error, response, body) {
    res.send(body);
  })
});

const port = 4000;
const server = app.listen(port);
console.log('Listening on port ' + port);