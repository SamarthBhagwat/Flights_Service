const { StatusCodes } = require('http-status-codes');
const {FlightRepository} = require('../repositories');
const AppError = require('../utils/error/app-error');

const flightRepository = new FlightRepository();

class FlightService {

    async createFlight(flightData){
        try {
            const flight = await flightRepository.create(flightData);
            return flight;    
        } catch (error) {
            if(error.name == 'SequelizeValidationError'){
                let error_array = error.errors;
                let explanation = [];
                error_array.forEach(element => {
                    explanation.push(element.message);
                });
                const appError = new AppError(explanation, StatusCodes.BAD_REQUEST);
                throw appError;
            }
            else if(error.name == 'SequelizeForeignKeyConstraintError') {
                let explanation = [];
                explanation.push(`Invalid value ${error.value} of foreign key ${error.index} for property ${error.fields[0]}. The value is not present in table ${error.table}.`)
                const appError = new AppError(explanation, StatusCodes.BAD_REQUEST);
                throw appError;
            }
            else{
                const appError = new AppError("Internal Server error", StatusCodes.INTERNAL_SERVER_ERROR);
                throw appError;
            }  
        }
    }

}

module.exports = FlightService;