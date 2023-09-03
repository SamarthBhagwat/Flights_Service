const AppError = require('../utils/error/app-error');
const { StatusCodes } = require('http-status-codes')
const { ErrorResponse } = require('../utils/response');

const validateCreateRequest = function(req, res, next){
    if(req.body.name && req.body.code && req.body.cityId){
        next();
    }
    else{
        if(!req.body.name){
            let explanation = [];
            explanation.push("name not found in request body");
            const appError = new AppError(explanation, StatusCodes.BAD_REQUEST);
            ErrorResponse.error = appError; 
            res.status(ErrorResponse.error.statusCode).send(ErrorResponse);
        }
        else if(!req.body.code){
            let explanation = [];
            explanation.push("code not found in request body");
            const appError = new AppError(explanation, StatusCodes.BAD_REQUEST);
            ErrorResponse.error = appError;
            res.status(ErrorResponse.error.statusCode).send(ErrorResponse);
        }
        else{
            let explanation = [];
            explanation.push("cityId not found in request body");
            const appError = new AppError(explanation, StatusCodes.BAD_REQUEST);
            ErrorResponse.error = appError;
            res.status(ErrorResponse.error.statusCode).send(ErrorResponse);
        }
    }
}

const validateUpdateRequest = function(req, res, next){
    // - In body, you will get the columns that needs to be updated. 
    // - You cannot update id of the airplane once set
    // - updatedAt column needs to be changes everytime a successful request is passed. 
    if(req.body.id){
        const appError = new AppError("Cannot update id of an airport", StatusCodes.BAD_REQUEST);
        ErrorResponse.error = appError;
        res.status(ErrorResponse.error.statusCode).send(ErrorResponse);
    }

    const request = req.body;
    for(const key in request){
        if(key == 'name' || key == 'code' || key == 'cityId'){
            continue;
        }
        else{
            const appError = new AppError(`Cannot update ${key} of the airport`, StatusCodes.BAD_REQUEST);
            ErrorResponse.error = appError;
            res.status(ErrorResponse.error.statusCode).send(ErrorResponse);
        }
    }

    next();
}

module.exports = {
    validateCreateRequest,
    validateUpdateRequest
}