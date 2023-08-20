const { StatusCodes } = require('http-status-codes');
const {CityRepository} = require('../repositories');
const AppError = require('../utils/error/app-error');

const cityRepository = new CityRepository();

class CityService {

    async createCity(cityData){
        try {
            const city = await cityRepository.create(cityData);
            return city;    
        } catch (error) {
            console.log(error);
            if(error.name == 'SequelizeValidationError' || error.name == 'SequelizeUniqueConstraintError'){
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

    async getCities(){
        try {
            const cities = await cityRepository.findAll();
            return cities;    
        } catch (error) {
            const appError = new AppError("Internal Server error", StatusCodes.INTERNAL_SERVER_ERROR);
            throw appError;
        }
        
    }

    async getCityById(id){
        try {
            const city = await cityRepository.findById(id);
            if(city){
                return city;
            }
            else{
                const appError = new AppError(`City with id ${id} not found` , StatusCodes.NOT_FOUND);
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

    async updateCity(id, updateData){
        try {
            const updateResponse = await cityRepository.update(id, updateData);    
            // Update response is an array containing 2 values : [affectedRowCount, metadataForUpdateOperation]
            if(updateResponse[0] > 0){
                const city = await cityRepository.findById(id);
                return city;
            }
            else{
                const appError = new AppError(`City with id ${id} not found`, StatusCodes.BAD_REQUEST);
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

    async deleteCity(id){
        const deleteResponse = await cityRepository.destroy(id);
        // Delete response will be the no.of rows deleted by destroy operation
        if(deleteResponse > 0){
            return `Successfully deleted city with id ${id}`
        }
        else{
            const appError = new AppError(`City with id ${id} not found`, StatusCodes.NOT_FOUND);
            throw appError;
        }
    }
}

module.exports = CityService;