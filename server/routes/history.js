"use strict";
const express = require('express');
const router = express.Router();
/* GET home page. */
router.post('/history', function(req, res) {
	const db = req.db;
	const collection = db.get('history');
	collection.find({},{},function(error, data){
		let length = data.length;
		let return_value = {};
		for(let i = 0; i < length; i++){
			if(return_value[data[i].type] === undefined){
				return_value[data[i].type] = [];
			}
			return_value[data[i].type].push(data[i]);
		}
		res.json(return_value);
	});
});
module.exports = router;