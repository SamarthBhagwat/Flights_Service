const { StatusCodes } = require('http-status-codes');
const {FlightService} = require('../services');
const { SuccessResponse , ErrorResponse} = require('../utils/response')

const flightService = new FlightService();

const createFlight = async function(req, res) {
    const flightData = req.body;
    try {
        const flight = await flightService.createFlight(flightData);
        SuccessResponse.data = flight;
        res.status(StatusCodes.CREATED).send(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        res.status(error.statusCode).send(ErrorResponse);
    }
}



module.exports = {
    createFlight
};