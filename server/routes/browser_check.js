const express = require('express');
const router = express.Router();
const UAParser = require('ua-parser-js');
/* GET home page. */
router.get('/*', function(req, res, next) {
	const parser = new UAParser();
	const browser = parser.setUA(req.headers['user-agent']).getBrowser();
	const browserName = browser.name;
	let browserVersion = 0;
	if(browser.version !== undefined)
		browserVersion = browser.version.split(".",1);
	if(browserName == 'IE'){
		//load html file if the browser is an IE
		res.sendFile('./public/views/ie.html', {root: req.rootPath});
	}else if((browserName == 'Firefox' && browserVersion <= 53) ||
		(browserName == 'Chrome' && browserVersion <= 50) ||
		(browserName == 'Canary' && browserVersion <= 32) ||
		(browserName == 'Safari' && browserVersion <= 10) ||
		(browserName == 'Opera' && browserVersion <= 46)){
		//load html file if the browser is outdated
		res.sendFile('./public/views/update.html', {root: req.rootPath});
	}else{
		//load the single view file (angular will handle the page changes on the front-end)
		res.sendFile('./public/views/index.html', {root: req.rootPath});
	}
});
module.exports = router;
