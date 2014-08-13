module.exports = function(app,passport) {

	app.post('/login', passport.authenticate('local-login', {
		successRedirect : '/success', 
		failureRedirect : '/#signin', 
		failureFlash : true 
	}));

	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect : '/success', 
		failureRedirect : '/#signin', 
		failureFlash : true 
	}));

	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/#signin');
	});

	app.get('/auth/facebook', passport.authenticate('facebook', { 
		scope : 'email' 
	}));

	app.get('/auth/facebook/callback', passport.authenticate('facebook', {
		successRedirect : '/success',
		failureRedirect : '/#signin'
	}));

	app.get('/auth/twitter', passport.authenticate('twitter'));

	app.get('/auth/twitter/callback', passport.authenticate('twitter', {
		successRedirect : '/success',
		failureRedirect : '/#signin'
	}));

	app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

    app.get('/auth/google/callback', passport.authenticate('google', {
        successRedirect : '/success',
        failureRedirect : '/#signin'
    }));	
};