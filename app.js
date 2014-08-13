var path          = require('path');
var express         = require('express');
var app             = express();
var port            = process.env.PORT || 3000;

var passport        = require('passport');
var flash           = require('connect-flash');

var morgan          = require('morgan');
var cookieParser    = require('cookie-parser');
var bodyParser      = require('body-parser');
var session         = require('express-session');

var passportConfig  = require('./app/config/passport');
var authentication  = require('./app/middleware/authentication');
var authRoutes      = require('./app/routes/auth');
var appRoutes       = require('./app/routes/app');

// comment next lines if you don't want mongo as users storage
var mongoose        = require('mongoose');
var User            = require('./app/models/user-mongo');
var mongoUri        = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/multiauth';
mongoose.connect(mongoUri); 
console.log('Connected to MongoDB at: ' + mongoUri);

// uncomment next line if you want in-memory users storage
// var User = require('./app/models/user-test');

passportConfig(passport,User);

app.set('views', __dirname + '/app/views/');
app.set('view engine', 'ejs'); 
app.use(morgan('dev')); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser()); 
app.use(session({ secret: 'caffenoamazon', resave:true, saveUninitialized:true })); 
app.use(passport.initialize());
app.use(passport.session()); 
app.use(flash()); 
app.use(authentication());

authRoutes(app, passport); 
appRoutes(app); 

app.listen(port);
console.log('App listening on port: ' + port);
