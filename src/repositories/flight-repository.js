const BasicCRUDRepository = require("./crud-repositories");
const {Flight, Airport, Airplane} = require('../models')

class FlightRepository extends BasicCRUDRepository{
    constructor(){
        super(Flight);
    }

    async getAllFlights(filter, sort){
        const response = await Flight.findAll({
            where: filter,
            order: sort,
            include: [
                {
                    model: Airplane,
                    as: 'airplane',
                    required : true
                },
                {
                    model: Airport,
                    as: 'departureAirport',
                    required : true
                },
                {
                    model: Airport,
                    as: 'arrivalAirport',
                    required : true
                }
            ]
        });
        return response
    }
}

module.exports = FlightRepository;