// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var moment = require('moment')


// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/dreams", function (request, response) {
  response.send(dreams);
});

// could also use the POST body instead of query string: http://expressjs.com/en/api.html#req.body
app.post("/dreams", function (request, response) {
  dreams.push(request.query.dream);
  response.sendStatus(200);
});

app.get("/:time", function (request, response) {
  var date = request.params.time;
  if (/\d{10,}$/.test(date)) {
    date = moment(date, 'X');
  } else {
    date = moment(date, 'MMMM D, YYYY');
  }
  if (date.isValid()) {
    response.json({
      unix: date.format('X'),
      natural: date.format('MMMM D, YYYY')
    })
  } else {
    response.json({
      unix: null,
      natural: null
    })
  }
})

// Simple in-memory store for now
var dreams = [
  "Find and count some sheep",
  "Climb a really tall mountain",
  "Wash the dishes"
];

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
