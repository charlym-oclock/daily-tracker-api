const express = require('express');
const homepageController = require('../controllers/homepageController')

const router = express.Router();

router.route('/')
// Nothing here
  .get(homepageController.homepage)



module.exports = router;