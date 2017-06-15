// BASE SETUP
// ==============================================
var express = require('express');
var app = express();
var router = express.Router();
var port = process.env.PORT || 4000;

// Middlewares
var morgan = require('morgan');
var errorhandler = require('errorhandler');
var ejs	= require('ejs');

// CONFIGURATION
// ==============================================
app.set('view engine', 'ejs');
app.engine('html',ejs.renderFile);

app.use(express.static(__dirname + '/app'));		// set the static | files location /app/img will be /img for users
app.use('/bower_components',  express.static(__dirname + '/bower_components'));
app.use(morgan('dev'));								// log every request to the console

if (process.env.NODE_ENV === 'development') {
	app.use(errorhandler());
}

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

// ROUTES
// ==============================================
app.use('/',router);

// ********************GENERAL ROUTES***************************
app.get('/*', function(req,res){
	res.render('../app/index.html', {title: 'Rajneethi', session: true});
});

// START THE SERVER
// ==============================================
app.listen(port, function () {
	console.log('Rajneethi is running on port ' + port);
	console.log("Running in %s mode", app.settings.env);
});