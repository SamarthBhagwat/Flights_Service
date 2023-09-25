const AppError = require('../utils/error/app-error');
const { StatusCodes } = require('http-status-codes')
const { ErrorResponse } = require('../utils/response');
const { compareTime } = require('../utils/helpers/datetime-helpers')

const validateCreateRequest = function(req, res, next){
    if(!req.body.flightNumber){
        let explanation = [];
        explanation.push("flightNumber not found in request body");
        const appError = new AppError(explanation, StatusCodes.BAD_REQUEST);
        ErrorResponse.error = appError; 
        res.status(ErrorResponse.error.statusCode).send(ErrorResponse);
    }
    if(!req.body.airplaneId){
        let explanation = [];
        explanation.push("airplaneId not found in request body");
        const appError = new AppError(explanation, StatusCodes.BAD_REQUEST);
        ErrorResponse.error = appError; 
        res.status(ErrorResponse.error.statusCode).send(ErrorResponse);
    }
    if(!req.body.departureAirportId){
        let explanation = [];
        explanation.push("departureAirportId not found in request body");
        const appError = new AppError(explanation, StatusCodes.BAD_REQUEST);
        ErrorResponse.error = appError; 
        res.status(ErrorResponse.error.statusCode).send(ErrorResponse);
    }
    if(!req.body.arrivalAirportId){
        let explanation = [];
        explanation.push("arrivalAirportId not found in request body");
        const appError = new AppError(explanation, StatusCodes.BAD_REQUEST);
        ErrorResponse.error = appError; 
        res.status(ErrorResponse.error.statusCode).send(ErrorResponse);
    }
    if(!req.body.departureTime){
        let explanation = [];
        explanation.push("departureTime not found in request body");
        const appError = new AppError(explanation, StatusCodes.BAD_REQUEST);
        ErrorResponse.error = appError; 
        res.status(ErrorResponse.error.statusCode).send(ErrorResponse);
    }
    if(!req.body.arrivalTime){
        let explanation = [];
        explanation.push("arrivalTime not found in request body");
        const appError = new AppError(explanation, StatusCodes.BAD_REQUEST);
        ErrorResponse.error = appError; 
        res.status(ErrorResponse.error.statusCode).send(ErrorResponse);
    }
    if(!req.body.price){
        let explanation = [];
        explanation.push("price not found in request body");
        const appError = new AppError(explanation, StatusCodes.BAD_REQUEST);
        ErrorResponse.error = appError; 
        res.status(ErrorResponse.error.statusCode).send(ErrorResponse);
    }
    if(!req.body.totalSeats){
        let explanation = [];
        explanation.push("totalSeats not found in request body");
        const appError = new AppError(explanation, StatusCodes.BAD_REQUEST);
        ErrorResponse.error = appError; 
        res.status(ErrorResponse.error.statusCode).send(ErrorResponse);
    }
    if(!compareTime(req.body.departureTime, req.body.arrivalTime)){
        let explanation = [];
        explanation.push("arrival time should be greater than departure time");
        const appError = new AppError(explanation, StatusCodes.BAD_REQUEST);
        ErrorResponse.error = appError;
        res.status(ErrorResponse.error.statusCode).send(ErrorResponse);
    }
    if(req.body.price <= 0){
        let explanation = [];
        explanation.push("price should not be zero or negative");
        const appError = new AppError(explanation, StatusCodes.BAD_REQUEST);
        ErrorResponse.error = appError;
        res.status(ErrorResponse.error.statusCode).send(ErrorResponse);
    }
    next()
}

module.exports = {
    validateCreateRequest
}