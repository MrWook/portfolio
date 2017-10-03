const express = require('express');
const router = express.Router();
const PHPFPM = require('node-phpfpm');

router.post('/php_error', function(req, res) {
	"use strict";
	let phpfpm = new PHPFPM({
		host: '127.0.0.1',
		port: 9000,
		documentRoot: req.rootPath+'/server/php/'
	});

	phpfpm.run({uri: 'processor.php', form:{type: req.body.type}}, function(err, output, phpErrors){
		let response = {};
		try{
			let data = JSON.parse(output);
			response = {
				type: data.type,
				text: data.text,
				data: []
			};

			const db = req.db;
			const collection = db.get('error_logs');
			//clear rootPath
			if(data !== undefined && data.data !== undefined && data.data.dataset !== undefined && data.data.dataset.file !== undefined )
				data.data.dataset.file = data.data.dataset.file.replace(req.rootPath, '');
			//insert error into db
			collection.insert({
				"error": data.data,
				"location":'php_error',
				"date":new Date
			}, function(e, data){
				collection.find({location:'php_error'}, function(e, data){
					let counter = 0;
					for(counter = 0; counter < data.length; counter++){
						response.data.push(data[counter].error);
					}
					//reset after 20 entrys
					if(counter >= 5){
						collection.remove({location:'php_error'});
					}
					res.json(response);
				})
			});
		}catch (error){
			response = {
				type: 'danger',
				text:'PHP_ERROR_HANDLER_FAILED'
			};
			res.json(response);
		}
	});
});
module.exports = router;
