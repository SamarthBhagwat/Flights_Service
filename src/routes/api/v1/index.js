const express = require('express');
const router = express.Router();
const airplaneRoute = require('./airplane-router')
const cityRoute = require('./city-router')
const airportRoute = require('./airport-router')

router.use('/airplanes', airplaneRoute);
router.use('/cities' , cityRoute);
router.use('/airports', airportRoute);

module.exports = router;