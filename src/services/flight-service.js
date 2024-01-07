const { StatusCodes } = require('http-status-codes');
const {FlightRepository, AirportRepository} = require('../repositories');
const AppError = require('../utils/error/app-error');
const {Op} = require('sequelize');

const flightRepository = new FlightRepository();
const airportRepository = new AirportRepository();

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

    async getAllFlights(query){
        // trips=MUM-DEL
        let customFilter = {};
        let sortFilter = [];
        console.log(query);
        if(query.trips){
            let res = query.trips.split("-");
            if(res.length != 2){
                let explanation = [];
                explanation.push('Invalid value for query param trips. Value should be in format sourceAirportId-arrivalAirportId only.');
                let appError = new AppError(explanation, StatusCodes.BAD_REQUEST);
                throw appError;
            }
            let departureAirportId = res[0];
            let arrivalAirportId = res[1];
            if(departureAirportId == arrivalAirportId){
                let explanation = [];
                explanation.push('Departure airport id and arrival airport id should be different.');
                let appError = new AppError(explanation, StatusCodes.BAD_REQUEST);
                throw appError;
            }  
            customFilter.departureAirportId = departureAirportId;
            customFilter.arrivalAirportId = arrivalAirportId;
        }

        // price=1000-4000
        if(query.price){
            let res = query.price.split("-");
            if(res.length != 2 && res.length != 1){
                let explanation = [];
                explanation.push('Invalid value for query param price. Value should be in format minPrice-maxPrice only.');
                let appError = new AppError(explanation, StatusCodes.BAD_REQUEST);
                throw appError;
            }
            let minPrice = res[0];
            let maxPrice = res[1];
            console.log(minPrice, maxPrice);
            if(!maxPrice){
                maxPrice = 20000;
            }
            customFilter.price = {
                [Op.between]: [minPrice, maxPrice]
            }
        }

        // travellers=2
        if(query.travellers){
            customFilter.totalSeats = {
                [Op.gte]: query.travellers
            }
        }

        // date = '2023-08-16'
        if(query.date){
            customFilter.date = {
                [Op.eq]: query.date
            }
        }

        // sort = price_ACS,departureTime_DESC
        if(query.sort){
            const params = query.sort.split(',');
            const sort = params.map((param) => param.split('_'));
            sortFilter = sort;
        }

        try {
            const flights = await flightRepository.getAllFlights(customFilter, sortFilter);
            return flights;
        } catch (error) {
            throw new AppError('Cannot fetch data of all the airplanes.', StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }

    async getFlight(id){
        try {
            const flight = await flightRepository.findById(id);
            if(flight){
                return flight;
            }
            else{
                const appError = new AppError(`Flight with id ${id} not found` , StatusCodes.NOT_FOUND);
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

    async updateSeats(data){
        try {
            const response = await flightRepository.updateRemainingSeats(data.flightId, data.seats, data.dec);
            return response;    
        } catch (error) {
            console.log(error);
            if(error.statusCode == StatusCodes.NOT_FOUND){
                throw error;
            }
            else{
                const appError = new AppError("Internal Server error", StatusCodes.INTERNAL_SERVER_ERROR);
                throw appError;
            }
        }
        
    }
}

module.exports = FlightService;