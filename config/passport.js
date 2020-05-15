var LocalStrategy = require('passport-local').Strategy;
const db = require("../models");
const User = db.users_tbl;
var passport = require('passport');
var encryption = require('../helpers/Encryption');


module.exports = function(passport) {
//Serialize sessions
passport.serializeUser(function (user, done) {
    //console.log('serialize user???');
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findOne({
        id: id
    }, function (err, user) {
        if (user.id) user.userId = user.id;
        done(err, user);
    });
});


//Use local strategy
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
},
    function (email, password, done) {
        console.log('fsecond',encryption.encryptData(email));
        console.log('password',encryption.encryptData(password));
        User.findOne({
            email: encryption.encryptData(email)
        }, function (err, user) {
            if (err) {
                console.log('err ps', JSON.stringify(err));
                return done(err);
            }
            if (!user) {
                console.log('Unknown use');
                return done(null, false, {
                    message: 'Unknown user'
                });
            }
            if (!encryption.encryptData(password)) {
                console.log('Invalid passwordd')
                return done(null, false, {
                    message: 'Invalid passwordd'
                });
            }
            console.log('chandra finala');
            return done(null, user);
        });
    }
));

}