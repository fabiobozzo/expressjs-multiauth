var publicPaths = [
    '/test',
	'/login',
	'/logout',
	'/signup',
    '/auth/facebook',
    '/auth/twitter',
    '/auth/google',
    '/auth/facebook/callback',
    '/auth/twitter/callback',
    '/auth/google/callback',
	'/'
];

module.exports = function() {
    return function(req, res, next) {
    	if ( publicPaths.indexOf(req.path)>=0 || req.isAuthenticated() ) {
            res.locals.user = req.user || {};
    		return next();	
    	} else { 
            console.log("Tentativo di accesso non autorizzato a: "+req.path);
    		res.redirect('/#signin');
    	}
    }
};