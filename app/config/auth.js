// please change client IDs and secrets to suit your social app configuration

module.exports = {

	'facebookAuth' : {
		'clientID' 		: 'FFF', 
		'clientSecret' 	: 'BBBBBBB', 
		'callbackURL' 	: 'http://localhost:3000/auth/facebook/callback'
	},

	'twitterAuth' : {
		'consumerKey' 		: 'TTT',
		'consumerSecret' 	: 'WWWWWWW',
		'callbackURL' 		: 'http://localhost:3000/auth/twitter/callback'
	},

	'googleAuth' : {
		'clientID' 		: 'GGG',
		'clientSecret' 	: 'OOOOOOO',
		'callbackURL' 	: 'http://localhost:3000/auth/google/callback'
	}

};
