const express = require('express')
const app = express()
const request = require('request')

require('dotenv').config()

app.use('/', express.static('public'))

app.get('/clans/:clanID', function(req, res) {
  const id = req.params.clanID;
  
  const options = {
    url: 'https://api.brawlhalla.com/clan/' + id + '/?api_key=' + process.env.APIKEY,
    method: 'GET'
  }
  
  request(options, function (error, response, body) {
    res.send(body)
  })
})

app.get('/players/:playerID', function(req, res) {
  const id = req.params.playerID;
  
  const options = {
    url: 'https://api.brawlhalla.com/player/' + id + '/stats/?api_key=' + process.env.APIKEY,
    method: 'GET'
  }
  
  request(options, function (error, response, body) {
    res.send(body)
  })
})

const port = process.env.PORT || 4000
const server = app.listen(port)
console.log('Listening on port ' + port)