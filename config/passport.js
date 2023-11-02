const UserModel  = require("../models/UserModel");
var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const keys  = require("./keys");

var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.keyOrSecret;

module.exports = passport => {
  passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    UserModel.findOne({id: jwt_payload.sub}).then(function(user) {
      if (user) {
          return done(null, user);
      } else {
          return done(null, false);
      }
  });
  }))
};
