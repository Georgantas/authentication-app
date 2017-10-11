
const jwt = require('jwt-simple');
const config = require('../config');
const User = require('../models/user');

function tokenForUser(user){
    const timestamp = new Date().getTime();

    // by convention, sub refers to 'subject' of the token
    // iat refers to 'issued at time'
    return jwt.encode( { sub: user.id, iat: timestamp }, config.secret);
}

exports.signup = function(req, res, next){
    // see if a user with a given email exists
    const { email, password } = req.body;

    if( !email || !password ){
        res.status(422).send( { error: 'Must provide email and password.'} );
    }

    User.findOne({ email: email }, function(err, existingUser){
        if(err){
            return next(err);
        }

        // if it does exist, return an error
        if(existingUser){
            res.status(422).send( { error: 'E-mail is in use.' });
        }

        // if not, create and save a user
        const user = new User({
            email: email,
            password: password
        });

        user.save(function(err){
            if(err){
                return next(err);
            }

            // respond to request indicating that the operation was successful
            res.json({ token: tokenForUser(user) });
        });
    });
}