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

const getAllFlights = async function(req, res){
    try {
        const flights = await flightService.getAllFlights(req.query);
        SuccessResponse.data = flights;
        res.status(StatusCodes.OK).send(SuccessResponse);
    } catch (error) {
        console.log(error);
        ErrorResponse.error = error;
        res.status(error.statusCode).send(ErrorResponse);
    }
}

const getFlight = async function(req, res){
    try {
        const id = req.params.id;
        const flight = await flightService.getFlight(id);
        SuccessResponse.data = flight;
        res.status(StatusCodes.OK).send(SuccessResponse);
    } catch (error) {
        console.log(error);
        ErrorResponse.error = error;
        res.status(error.statusCode).send(ErrorResponse);
    }
}

const updateSeats = async function(req, res){
    try {
        const data = {};
        data.flightId = req.params.id;
        data.seats = req.body.seats;
        data.dec = req.body.dec;
        const response = await flightService.updateSeats(data);
        SuccessResponse.data = response;
        res.status(StatusCodes.OK).send(SuccessResponse);
    } catch (error) {
        console.log(error);
        ErrorResponse.error = error;
        res.status(error.statusCode).send(ErrorResponse);
    }
}



module.exports = {
    createFlight,
    getAllFlights,
    getFlight,
    updateSeats
};