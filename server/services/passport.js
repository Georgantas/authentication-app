
const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

const localOptions = { usernameField: 'email' }; // since we're not using a username
const localLogin = new LocalStrategy( localOptions, function(email, password, done){
    // verify this email and password, call done with the user
    // if it is the correct credentials
    // otherwise, call done with false to indicate failure

    User.findOne( { email: email }, function(err, user){
        if(err) { done(err, false); }
        if(!user){ done(null, false); }

        // compare passwords
        user.comparePassword( password, function(err, isMatch) {
            if(err) { return done(err, false); }
            if(!isMatch){ return done(null, false); }

            return done(null, user); // will be assigned to req.user
        })
    });
});


// Set up options for JWT Strategy
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.secret
};

// create jwt strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done){
    // see if the user id in the payload exists in the database
    // if it does, call done with that other
    // otherwise, call done without a user object

    User.findById( payload.sub, function(err, user) {
        if(err) { return done(err, false); }

        if(user){
            return done(null, true);
        } else {
            return done(null, false);
        }
    });
})

// tell passport to use the jwt strategy
passport.use(jwtLogin);
passport.use(localLogin);
