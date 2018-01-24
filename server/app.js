const express = require("express");
const volleyball = require("volleyball");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

// logging and body-parsing
app.use(volleyball);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// static file-serving middleware
app.use(express.static(path.join(__dirname, "..", "public")));

  app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public/index.html'))
  })

// failed to catch req above means 404, forward to error handler
app.use(function(req, res, next) {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});



// handle any errors
app.use(function(err, req, res, next) {
  res.status(err.status || 500).send(err.message);
});

// listen on a port
// const PORT = process.env.PORT// || 3000
app.listen(process.env.PORT || 3000, function() {
   console.log("The server is listening closely on port")
});

module.exports = app;
