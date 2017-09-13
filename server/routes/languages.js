const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/lang/:key', function(req, res) {
	"use strict";
	const db = req.db;
	const collection = db.get('i18n');
	let response = {};
	collection.find({language: req.params.key},{},function(error, data){
		const length = data.length;
		for(let i = 0; i < length; i++){
			response[data[i]['marker']] = data[i]['label'];
		}
		res.json(response);
	});
});
module.exports = router;