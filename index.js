const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const app = express();
const mongo = require('mongodb');
const config = cfg = require('./server/config/config_production');
const db  = require('monk')('mongodb://'+config.mongo.user+':'+config.mongo.password+'@'+config.mongo.host+':'+config.mongo.port+'/'+config.mongo.db);
//set port
app.listen(config.port);
//set mode
process.env.NODE_ENV = config.env;

//use gzip
app.use(require('./server/routes/gzip'));
//set security header
app.use(helmet({
	contentSecurityPolicy: {
		directives: {
			defaultSrc: ["'self'"],
			styleSrc: ["'self'", "'unsafe-inline'", "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.3.0/css/"],
			imgSrc: ["'self'", 'data:'],
			fontSrc: ["'self'", "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.3.0/fonts/"],
		}
	},
	expectCt: true,
	hidePoweredBy: { setTo: 'Malbolge 4.2' },
	hpkp : false,
	hsts : false,
	referrerPolicy: true,
}));

//set cache header
app.use(function(req,res,next){
	res.setHeader('Surrogate-Control', ' max-age=604800');
	res.setHeader('Cache-Control', ' max-age=604800');
	res.setHeader('Pragma', 'no-cache');
	next();
});
//make folder accessible for the application
app.use(express.static(__dirname+"/public"));
app.use(express.static(__dirname+"/bower_components"));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

//error handler
app.use(function(err, req, res, next) {
	res.status(err.status);
	res.render('error', {
		message: err.message,
		error: err
	});
});
// Make db and root Path accessible to the router
app.use(function(req,res,next){
	req.db = db;
	req.rootPath = __dirname;
	next();
});
// load language
app.use(require('./server/routes/languages'));
//get config
app.use(require('./server/routes/config'));
//check for browser and load file after the browser
app.use(require('./server/routes/browser_check'));
//log error
app.use(require('./server/routes/error_logging'));
//contact
app.use(require('./server/routes/contact'));
//php error
app.use(require('./server/routes/php_error'));

