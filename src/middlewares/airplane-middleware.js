const AppError = require('../utils/error/app-error');
const { StatusCodes } = require('http-status-codes')
const { ErrorResponse } = require('../utils/response');

const validateCreateRequest = function(req, res, next){
    if(req.body.modelNumber && req.body.capacity){
        next();
    }
    else{
        if(!req.body.modelNumber){
            let explanation = [];
            explanation.push("modelNumber not found in request body");
            const appError = new AppError(explanation, StatusCodes.BAD_REQUEST);
            ErrorResponse.error = appError; 
            res.status(ErrorResponse.error.statusCode).send(ErrorResponse);
        }
        else{
            let explanation = [];
            explanation.push("capacity not found in request body");
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
        const appError = new AppError("Cannot update id of an airplane", StatusCodes.BAD_REQUEST);
        ErrorResponse.error = appError;
        res.status(ErrorResponse.error.statusCode).send(ErrorResponse);
    }

    const request = req.body;
    for(const key in request){
        if(key == 'modelNumber' || key == 'capacity'){
            continue;
        }
        else{
            const appError = new AppError(`Cannot update ${key} of the airplane`, StatusCodes.BAD_REQUEST);
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