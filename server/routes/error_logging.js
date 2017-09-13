const express = require('express');
const router = express.Router();

router.put('/log_error', function(req, res) {
	"use strict";
	const db = req.db;
	const msg = req.body.msg;
	const location = req.body.location;
	const collection = db.get('error_logs');
	collection.insert( {
		"error": msg,
		"location":location,
		"date":new Date
	});
	res.json({type: 'success'});
});
module.exports = router;
