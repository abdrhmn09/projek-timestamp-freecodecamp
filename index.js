// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

const isInvalidDate = (date) => date.toString() === 'Invalid Date'

// your first API endpoint... 
app.get("/api/:date?", function (req, res) {
  let date;
  
  if (!req.params.date) {
    // Handle empty date parameter - return current time
    date = new Date();
  } else {
    // Try parsing as Unix timestamp if it's a number
    date = isNaN(req.params.date) ? new Date(req.params.date) : new Date(+req.params.date);
  }
  
  if (isInvalidDate(date)) {
    res.json({ error: "Invalid Date" });
    return;
  }
  
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
