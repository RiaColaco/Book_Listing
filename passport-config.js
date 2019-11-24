var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

var FacebookStrategy = require('passport-facebook').Strategy;

var User = require('./server/models/user')

passport.use('local', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
},
  function (username, password, done) {
    User.findOne({ email: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.isValid(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

passport.use(new FacebookStrategy({
  clientID: '3476329425740949',
  clientSecret: '2454f7bcb4d4414909ae062171f3ce3f',
  callbackURL: "http://localhost:3000/auth/facebook/callback",
  profileFields: ['id', 'displayName', 'photos', 'email']
},
  function (accessToken, refreshToken, profile, done) {
    console.log("data",profile)
    // User.findOrCreate(..., function(err, user) {
    //   if (err) { return done(err); }
    //   done(null, user);
    // });
    done(null, profile)
  }
));

// passport.serializeUser(function (user, done) {
//   done(null, user._id);
// });

// passport.deserializeUser(function (id, done) {
//   User.findById(id, function (err, user) {
//     done(err, user);
//   });
// });

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});
