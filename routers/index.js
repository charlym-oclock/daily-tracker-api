const express = require('express');

const router = express.Router();

const routerApi = require('./api.router');


router.use('/api', routerApi);


module.exports = router;