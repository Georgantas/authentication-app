
const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

// Set up options for JWT Strategy
const jwtOptions = { };

// create jwt strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done){
    // see if the user id in the payload exists in the database
    // if it does, call done with that other
    // otherwise, call done without a user object

    User.findById( payload.sub, function(err, user) {
        if(err) {
            return done(err, false);
        }

        if(user){
            return done(null, true);
        } else {
            return done(null, false);
        }
    });
})

// tell passport to use the jwt strategy