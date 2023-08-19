const { StatusCodes } = require('http-status-codes');
const {AirplaneRepository} = require('../repositories');
const AppError = require('../utils/error/app-error');

const airplaneRepository = new AirplaneRepository();

class AirplaneService {

    async createAirplane(airplaneData){
        try {
            const airplane = await airplaneRepository.create(airplaneData);
            return airplane;    
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
            else{
                const appError = new AppError("Internal Server error", StatusCodes.INTERNAL_SERVER_ERROR);
                throw appError;
            }  
        }
    }

    async getAirplanes(){
        try {
            const airplanes = await airplaneRepository.findAll();
            return airplanes;    
        } catch (error) {
            const appError = new AppError("Internal Server error", StatusCodes.INTERNAL_SERVER_ERROR);
            throw appError;
        }
        
    }

    async getAirplaneById(id){
        const airplane = await airplaneRepository.findById(id);
        if(airplane){
            return airplane;
        }
        else{
            const appError = new AppError(`Airplane with id ${id} not found` , StatusCodes.BAD_REQUEST);
            throw appError;
        }
    }

    async updateAirplane(id, updateData){
        try {
            const updateResponse = await airplaneRepository.update(id, updateData);    
            // Update response is an array containing 2 values : [affectedRowCount, metadataForUpdateOperation]
            if(updateResponse[0] > 0){
                console.log("update response greater than 0");
                const airplane = await airplaneRepository.findById(id);
                return airplane;
            }
            else{
                const appError = new AppError(`Airplane with id ${id} not found`, StatusCodes.BAD_REQUEST);
                throw appError;
            }
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
            else if (error instanceof AppError){
                throw error;
            }
            else{
                const appError = new AppError("Server error", StatusCodes.INTERNAL_SERVER_ERROR);
                throw appError;
            }
        }
        
        
    }

    async deleteAirplane(id){
        const deleteResponse = await airplaneRepository.destroy(id);
        // Delete response will be the no.of rows deleted by destroy operation
        if(deleteResponse > 0){
            return `Successfully deleted airplane with id ${id}`
        }
        else{
            const appError = new AppError(`Airplane with id ${id} not found`, StatusCodes.BAD_REQUEST);
            throw appError;
        }
    }
}

module.exports = AirplaneService;