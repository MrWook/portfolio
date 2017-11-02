const express = require('express');
const router = express.Router();

router.put('/contact', function(req, res) {
	"use strict";
	const db = req.db;
	const msg = req.body;
	const collection = db.get('messages');

	//check if value is set and is not empty
	let check = function(value){
		return !(value === undefined || value === '' || value === null);
	};

	if(check(msg.name) && check(msg.email) && check(msg.msg)){
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
	}else{
		res.json({type: 'danger', text: 'CONTACT_MISSING_DATA'});
	}
});
module.exports = router;
