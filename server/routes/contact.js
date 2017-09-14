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
	}, function(err, result) {
		if(err === null){
			res.json({type: 'success', text: 'CONTACT_SEND_SUCCESS'});
		}else{
			res.json({type: 'danger', text: 'CONTACT_SEND_FAILED'});
		}
	});
});
module.exports = router;
