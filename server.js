//Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

//Setup Express app
var app = express();
var PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//including api and html routing files on our server
require("./app/routing/apiRoutes.js")(app);
require("./app/routing/htmlRoutes.js")(app);



















//Starts server to begin listening
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});