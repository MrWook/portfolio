const express = require('express');
const router = express.Router();
// load language
router.use(require('./routes/languages'));
//get config
router.use(require('./routes/config'));
//check for browser and load file after the browser
router.use(require('./routes/browser_check'));
//log error
router.use(require('./routes/error_logging'));
//contact
router.use(require('./routes/contact'));
//php error
router.use(require('./routes/php_error'));


module.exports = router;