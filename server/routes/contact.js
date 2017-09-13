const express = require('express');
const router = express.Router();

router.put('/contact', function(req, res) {
	"use strict";
	const db = req.db;
	const msg = req.body;
	const collection = db.get('messages');

	collection.insert( {
		"name": msg.name,
		"email": msg.email,
		"msg": msg.msg,
		"date":new Date
	});

	res.json({type: 'success'});
});
module.exports = router;
