const express = require('express');
const router = express.Router();
const airplaneRoute = require('./airplane-router')

router.use('/airplanes', airplaneRoute)

module.exports = router;