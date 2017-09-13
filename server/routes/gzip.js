const express = require('express');
const router = express.Router();
router.get('*gz', function(req, res, next) {
	if(req.url == '/zipped/style.gz')
		res.setHeader('Content-Type', 'text/css');
	else
		res.setHeader('Content-Type', 'application/javascript');
	res.setHeader('Content-Encoding', 'gzip');
	next();
});
module.exports = router;