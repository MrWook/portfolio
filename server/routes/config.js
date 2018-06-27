const express = require('express');
const router = express.Router();

/* GET config */
router.post('/config', function(req, res) {
	"use strict";
	const db = req.db;
	const collection = db.get('system_parameter');
	let config = {};
	let language = req.acceptsLanguages()[0];
	if(language == 'de' || language == 'de-DE')
		config.language = 'de_DE';
	else
		config.language = 'en_US';
	collection.find({},{},function(error, data){
		for(let i = 0; i < data.length; i++){
			config[data[i]['name']] = data[i]['value'];
		}
		res.json({type: 'success', config: config});
	});

});
module.exports = router;
