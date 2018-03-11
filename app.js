var path = require("path");
var express = require("express");
var bodyParser = require("body-parser");
var app = express();  // make express app
var http = require('http').Server(app);
var session = require("express-session");
var mongoose = require('mongoose');
var expressLayouts = require('express-ejs-layouts');
var fileUpload = require('express-fileupload');
var date = require('date-and-time');
mongoose.connect('mongodb://localhost:27017/hangar');
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 600000 }}))
// set up the view engine

//setting user login data to local variables
app.use(function (request, response,next) {
  response.locals.user = request.session.user;
  response.locals.date = date

  next();
});
app.use(fileUpload());
app.use(express.static(__dirname + '/assets'));
app.set("views", path.resolve(__dirname, "views")); // path to views
app.set("view engine", "ejs"); // specify our view engine
app.use(bodyParser.urlencoded({ extended: false }));

// http GET (default and /new-entry)
app.use(expressLayouts);


app.use(require("./controllers/user.js"));

app.use("/admin",require("./controllers/admin.js"));



// 404
app.use(function (request, response) {
  response.status(404).render("404");
});

// Listen for an application request on port 8081
http.listen(8081, function () {
  console.log('App listening on http://127.0.0.1:8081/');
});
;