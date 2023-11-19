const BasicCRUDRepository = require("./crud-repositories");
const {Flight, Airport, Airplane, City} = require('../models')

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
                    required : true,
                    include: {
                        model : City,
                        as: 'city',
                        required: true
                    }
                },
                {
                    model: Airport,
                    as: 'arrivalAirport',
                    required : true,
                    include: {
                        model : City,
                        as: 'city',
                        required: true
                    }
                }
            ]
        });
        return response
    }

    async updateSeats(flightId, seats, dec = 1){
        const flight = await this.findById(flightId);
        if(parseInt(dec)){
            await flight.decrement('totalSeats' , {by: seats});
        }
        else{
            await flight.increment('totalSeats', {by: seats});
        }
        await flight.reload()
        return flight;
    }
}

module.exports = FlightRepository;