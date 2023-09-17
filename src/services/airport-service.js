const { StatusCodes } = require('http-status-codes');
const {AirportRepository} = require('../repositories');
const AppError = require('../utils/error/app-error');

const airportRepository = new AirportRepository();

class AirportService {

    async createAirport(airportData){
        try {
            const airport = await airportRepository.create(airportData);
            return airport;    
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

    async getAirports(){
        try {
            const airports = await airportRepository.findAll();
            return airports;    
        } catch (error) {
            const appError = new AppError("Internal Server error", StatusCodes.INTERNAL_SERVER_ERROR);
            throw appError;
        }
        
    }

    async getAirportById(id){
        try {
            const airport = await airportRepository.findById(id);
            if(airport){
                return airport;
            }
            else{
                const appError = new AppError(`Airport with id ${id} not found` , StatusCodes.NOT_FOUND);
                throw appError;
            }   
        } catch (error) {
            if(error.statusCode == StatusCodes.NOT_FOUND){
                throw error;
            }
            else{
                const appError = new AppError("Internal Server error", StatusCodes.INTERNAL_SERVER_ERROR);
                throw appError;
            }
        }
        
    }

    async updateAirport(id, updateData){
        try {
            const updateResponse = await airportRepository.update(id, updateData);    
            // Update response is an array containing 2 values : [affectedRowCount, metadataForUpdateOperation]
            if(updateResponse[0] > 0){
                console.log("update response greater than 0");
                const airport = await airportRepository.findById(id);
                return airport;
            }
            else{
                const appError = new AppError(`Airport with id ${id} not found`, StatusCodes.BAD_REQUEST);
                throw appError;
            }
        } catch (error) {
            console.log("Error in service", error.name);
            if(error.name == 'SequelizeValidationError'){
                let error_array = error.errors;
                let explanation = [];
                error_array.forEach(element => {
                    explanation.push(element.message);
                });
                const appError = new AppError(explanation, StatusCodes.BAD_REQUEST);
                throw appError;
            }
            else if(error.name == 'SequelizeForeignKeyConstraintError'){
                let explanation = `${error.name}. Provided value of foreign key ${error.index} does not exist in table ${error.table} in columns ${error.fields}`
                const appError = new AppError(explanation, StatusCodes.BAD_REQUEST);
                throw appError;
            }
            else if (error instanceof AppError){
                throw error;
            }
            else{
                const appError = new AppError("Server error", StatusCodes.INTERNAL_SERVER_ERROR);
                throw appError;
            }
        }
        
        
    }

    async deleteAirport(id){
        const deleteResponse = await airportRepository.destroy(id);
        // Delete response will be the no.of rows deleted by destroy operation
        if(deleteResponse > 0){
            return `Successfully deleted airport with id ${id}`
        }
        else{
            const appError = new AppError(`Airport with id ${id} not found`, StatusCodes.NOT_FOUND);
            throw appError;
        }
    }
}

module.exports = AirportService;