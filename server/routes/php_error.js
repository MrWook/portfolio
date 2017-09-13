const express = require('express');
const router = express.Router();

router.post('/php_error', function(req, res) {
	"use strict";
	res.json({type: 'warning', text:'missing php connection'});
});
module.exports = router;
