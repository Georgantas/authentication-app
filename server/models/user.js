
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

// define our model
const userSchema = new Schema({
    email: { type: String, unique: true, lowercase: true }, // to enforce uniqueness
    password: String
});

// on save hook, save password
// before saving a model, run this function
userSchema.pre('save', function(next){ //pre-'save'
    // get access user model
    const user = this;

    // gen salt then run callback
    bcrypt.genSalt(10, function(err, salt){
        if(err){ return next(err); }

        // hash password using salt
        bcrypt.hash(user.password, salt, null, function(err, hash){
            if(err){ return next(err); }

            //overwrite plain text password
            user.password = hash;
            next();
        })
    });
})

userSchema.methods.comparePassword = function(candidatePassword, callback){
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
        if(err) { return callback(err); }

        callback(null, isMatch);
    })
}

// create the model class
const ModelClass = mongoose.model('user', userSchema);

// export the model
module.exports = ModelClass;
