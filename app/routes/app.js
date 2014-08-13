module.exports = function(app) {

	app.get('/', function(req, res){
		res.render('index', { 
			title: 'Welcome!', 
			projectUrl:"http://github.com/fabiobozzo/expressjs-multiauth",
			message: req.flash('signinMessage') 
		});
	});

	app.get('/success', function(req, res){
		res.render('success', { title: 'Congrats!' });
	});
};

