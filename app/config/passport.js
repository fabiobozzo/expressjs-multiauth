var LocalStrategy       = require('passport-local').Strategy;
var FacebookStrategy    = require('passport-facebook').Strategy;
var TwitterStrategy     = require('passport-twitter').Strategy;
var GoogleStrategy      = require('passport-google-oauth').OAuth2Strategy;

var authConfig          = require('./auth');

module.exports = function(passport,User) {

    passport.serializeUser(function(user, done) {
        done(null, user._id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    // REGISTRAZIONE CON E-MAIL
    passport.use(

        'local-signup', 
        
        new LocalStrategy(
            
            {
                usernameField : 'email',
                passwordField : 'password',
                passReqToCallback : true 
            },

            function(req, email, password, done) {

                process.nextTick(function() {

                    User.findOne({ 'email' :  email }, function(err, user) {
                        
                        if (err) return done(err);

                        if (user) {

                            return done(null, false, req.flash('signinMessage', 'Utente già esistente.'));

                        } else {

                            var newUser             = new User();
                            newUser.fullName        = req.body.name || '';
                            newUser.email           = email;
                            newUser.local.password  = newUser.generateHash(password);
                            
                            newUser.save(function(err) {
                                if (err) throw err;
                                return done(null, newUser);
                            });
                        }

                    });    

                });
            }
        )
    );

    // LOGIN CON E-MAIL
    passport.use(

        'local-login',

        new LocalStrategy(
            {
                usernameField : 'email',
                passwordField : 'password',
                passReqToCallback : true 
            },
            function(req, email, password, done) { 

                User.findOne({ 'email' :  email }, function(err, user) {

                    if (err) return done(err);

                    if (!user) {
                        return done(null, false, req.flash('signinMessage', 'Questo utente non esiste.')); 
                    }

                    if (!user.validPassword(password)) {
                        return done(null, false, req.flash('signinMessage', 'Oops! La password non è corretta.')); 
                    }

                    return done(null, user);
                });

            }
        )
    );

    // FACEBOOK
    passport.use(

        new FacebookStrategy({
            clientID        : authConfig.facebookAuth.clientID,
            clientSecret    : authConfig.facebookAuth.clientSecret,
            callbackURL     : authConfig.facebookAuth.callbackURL
        },

        function(token, refreshToken, profile, done) {
            
            process.nextTick(function() {

                User.findByEmailOrQuery( profile.emails[0].value, { 'facebook.id' : profile.id }, function(err, user) {

                    if (err) return done(err);

                    if (!user) {
                        var user = new User();
                    }

                    user.facebook.id    = profile.id; 
                    user.facebook.token = token; 
                    user.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName; 
                    user.email          = profile.emails[0].value; 

                    user.save(function(err) {
                        if (err) throw err;
                        return done(null, user);
                    });

                });
            });

        })
    );

    // TWITTER
    passport.use(
        new TwitterStrategy({
            consumerKey     : authConfig.twitterAuth.consumerKey,
            consumerSecret  : authConfig.twitterAuth.consumerSecret,
            callbackURL     : authConfig.twitterAuth.callbackURL
        },
        function(token, tokenSecret, profile, done) {

            process.nextTick(function() {

                User.findOne({ 'twitter.id' : profile.id }, function(err, user) {

                    if (err) return done(err);

                    if (user) {
                        return done(null, user); 
                    } else {
                        
                        var newUser = new User();
                        newUser.twitter.id = profile.id;
                        newUser.twitter.token = token;
                        newUser.twitter.username = profile.username;
                        newUser.twitter.displayName = profile.displayName;

                        newUser.save(function(err) {
                            if (err) throw err;
                            return done(null, newUser);
                        });
                    }
                });

            });
        })
    );

    // GOOGLE
    passport.use(
        new GoogleStrategy({
            clientID        : authConfig.googleAuth.clientID,
            clientSecret    : authConfig.googleAuth.clientSecret,
            callbackURL     : authConfig.googleAuth.callbackURL,
        },
        function(token, refreshToken, profile, done) {

            process.nextTick(function() {

                User.findByEmailOrQuery( profile.emails[0].value, { 'google.id' : profile.id }, function(err, user) {
                    
                    if (err) return done(err);

                    if (!user) {
                        var user = new User();
                    } 

                    user.google.id    = profile.id;
                    user.google.token = token;
                    user.google.name  = profile.displayName;
                    user.email        = profile.emails[0].value; 

                    user.save(function(err) {
                        if (err) throw err;
                        return done(null, user);
                    });

                });
            });

        })
    );

};