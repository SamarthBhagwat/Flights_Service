const express = require('express');
const router = express.Router();
const airplaneRoute = require('./airplane-router')
const cityRoute = require('./city-router')

router.use('/airplanes', airplaneRoute);
router.use('/cities' , cityRoute)

module.exports = router;