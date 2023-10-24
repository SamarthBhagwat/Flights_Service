const BasicCRUDRepository = require("./crud-repositories");
const {Flight, Airport} = require('../models')

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
                    model: Airport,
                    as: 'departureAirport'
                },
                {
                    model: Airport,
                    as: 'arrivalAirport'
                }
            ]
        });
        return response
    }
}

module.exports = FlightRepository;