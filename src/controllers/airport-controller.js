const { StatusCodes } = require('http-status-codes');
const {AirportService} = require('../services');
const { SuccessResponse , ErrorResponse} = require('../utils/response')

const airportService = new AirportService();

const createAirport = async function(req, res) {
    const airportData = req.body;
    try {
        const airport = await airportService.createAirport(airportData);
        SuccessResponse.data = airport;
        res.status(StatusCodes.CREATED).send(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        res.status(error.statusCode).send(ErrorResponse);
    }
}

const getAirports = async function(req, res){
    try {
        const airports = await airportService.getAirports();
        SuccessResponse.data = airports;
        res.send(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        res.status(error.statusCode).send(ErrorResponse);
    }
}

const getAirportById = async function(req, res){
    const id = req.params.id;
    try {
        const airport = await airportService.getAirportById(id);
        SuccessResponse.data = airport;
        res.send(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        res.status(error.statusCode).send(ErrorResponse);
    }
}

const updateAirport = async function(req, res){
    console.log("Inside controller update function");
    const id = req.params.id;
    console.log(`id is ${id}`);
    const updateData = req.body;
    console.log(updateData);
    try {
        const updatedAirport = await airportService.updateAirport(id, updateData);
        SuccessResponse.data = updatedAirport;
        res.status(StatusCodes.OK).send(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        res.status(error.statusCode).send(ErrorResponse);
    }
}

const deleteAirport = async function(req, res){
    const id = req.params.id;
    try {
        const deletedAirport = await airportService.deleteAirport(id);
        SuccessResponse.data = deletedAirport;
        res.status(StatusCodes.OK).send(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        res.status(ErrorResponse.error.statusCode).send(ErrorResponse);
    }
}



module.exports = {
    createAirport,
    getAirports,
    getAirportById, 
    updateAirport,
    deleteAirport
};