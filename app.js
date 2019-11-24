var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var html = require("express-handlebars");
const handlebarsHelpers = require('./server/common/handlebarsHelpers');

var bodyParser = require("body-parser");
var fs = require("fs");
const cheerio = require("cheerio");

var indexRouter = require('./server/routes/index');
var usersRouter = require('./server/routes/users');

var cors = require('cors')
var app = express();

// view engine setup
app.engine(
  "html",
  html({
    extname: "html",
    defaultLayout: "layout",
    helpers: handlebarsHelpers
  })
);
app.set("view engine", "html");

app.use(bodyParser.json({ limit: "500mb", extended: true })); //Accept JSON Params
app.use(bodyParser.urlencoded({ limit: "500mb", extended: true }));

app.use(express.static(__dirname + "/server/public"));

app.use(
  express.static(path.join(__dirname, "dist/frontend"), {
    index: false
  })
); ///

app.use(cors({
  origin:['http://localhost:4200','http://127.0.0.1:4200','http://localhost:3000','http://127.0.0.1:3000'],
  credentials: true
}))

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/listing');

// passport
var passport = require('passport');
var session = require('express-session');

const MongoStore = require('connect-mongo')(session);

app.use(session({
  name: 'myname.sid',
  resave:false,
  saveUninitialized:false,
  secret:'secret',
  cookie:{
    maxAge:36000000,
    httpOnly:false,
    secure:false
  },
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

require('./passport-config');

app.use(passport.initialize());
app.use(passport.session());

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', {
    failureRedirect: '/users/login',
    successRedirect: '/users/user',
  }));

app.get('/auth/facebook',
  passport.authenticate('facebook', { scope: 'email' })
);


// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', indexRouter);
app.use('/users', usersRouter);

// to create dist folder
app.get("/*", function (req, res) {
  var html = fs.readFileSync(
    path.join(__dirname, "dist/frontend/index.html"),
    "utf8"
  );

  var $ = cheerio.load(html);

  res.send($.html());
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.set("port", process.env.PORT || 3000);

app.listen(app.get("port"), function () {
  console.log("Node app is running on port", app.get("port"));
});

module.exports = app;
