const { StatusCodes } = require('http-status-codes');
const {CityService} = require('../services');
const { SuccessResponse , ErrorResponse} = require('../utils/response')

const cityService = new CityService();

const createCity = async function(req, res) {
    const cityData = req.body;
    try {
        const city = await cityService.createCity(cityData);
        SuccessResponse.data = city;
        res.status(StatusCodes.CREATED).send(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        res.status(error.statusCode).send(ErrorResponse);
    }
}

const getCities = async function(req, res){
    try {
        const cities = await cityService.getCities();
        SuccessResponse.data = cities;
        res.status(StatusCodes.OK).send(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        res.status(error.statusCode).send(ErrorResponse);
    }
}

const getCityById = async function(req, res){
    const id = req.params.id;
    try {
        const city = await cityService.getCityById(id);
        SuccessResponse.data = city;
        res.send(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        res.status(error.statusCode).send(ErrorResponse);
    }
}

const updateCity = async function(req, res){
    const id = req.params.id;
    const updateData = req.body;
    try {
        const updatedCity = await cityService.updateCity(id, updateData);
        SuccessResponse.data = updatedCity;
        res.status(StatusCodes.OK).send(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        res.status(error.statusCode).send(ErrorResponse);
    }
}

const deleteCity = async function(req, res){
    const id = req.params.id;
    try {
        const deletedCity = await cityService.deleteCity(id);
        SuccessResponse.data = deletedCity;
        res.status(StatusCodes.OK).send(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        res.status(ErrorResponse.error.statusCode).send(ErrorResponse);
    }
}



module.exports = {
    createCity,
    getCities,
    getCityById, 
    updateCity,
    deleteCity
};