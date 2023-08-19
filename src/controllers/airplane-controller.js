const { StatusCodes } = require('http-status-codes');
const {AirplaneService} = require('../services');
const { SuccessResponse , ErrorResponse} = require('../utils/response')

const airplaneService = new AirplaneService();

const createAirplane = async function(req, res) {
    const airplaneData = req.body;
    try {
        const airplane = await airplaneService.createAirplane(airplaneData);
        SuccessResponse.data = airplane;
        res.status(StatusCodes.CREATED).send(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        res.status(error.statusCode).send(ErrorResponse);
    }
}

const getAirplanes = async function(req, res){
    try {
        const airplanes = await airplaneService.getAirplanes();
        SuccessResponse.data = airplanes;
        res.send(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        res.status(error.statusCode).send(ErrorResponse);
    }
}

const getAirplaneById = async function(req, res){
    const id = req.params.id;
    try {
        const airplane = await airplaneService.getAirplaneById(id);
        SuccessResponse.data = airplane;
        res.send(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        res.status(error.statusCode).send(ErrorResponse);
    }
}

const updateAirplane = async function(req, res){
    console.log("Inside controller update function");
    const id = req.params.id;
    console.log(`id is ${id}`);
    const updateData = req.body;
    console.log(updateData);
    try {
        const updatedAirplane = await airplaneService.updateAirplane(id, updateData);
        SuccessResponse.data = updatedAirplane;
        res.status(StatusCodes.OK).send(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        res.status(error.statusCode).send(ErrorResponse);
    }
}

const deleteAirplane = async function(req, res){
    const id = req.params.id;
    try {
        const deletedAirplane = await airplaneService.deleteAirplane(id);
        SuccessResponse.data = deletedAirplane;
        res.status(StatusCodes.OK).send(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        res.status(ErrorResponse.error.statusCode).send(ErrorResponse);
    }
}



module.exports = {
    createAirplane,
    getAirplanes,
    getAirplaneById, 
    updateAirplane,
    deleteAirplane
};