const BasicCRUDRepository = require("./crud-repositories");
const {Flight, Airport, Airplane, City} = require('../models');
const db = require('../models');
const { addRowLockOnFlights } = require('./queries')

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

    async updateRemainingSeats(flightId, seats, dec = true){
        const transaction = await db.sequelize.transaction();
        try {
            // Adding a row-level lock on the flights, basically we are performing a raw query here and the raw query contains FOR UPDATE
            // that applies a lock on the flights table 
            await db.sequelize.query(addRowLockOnFlights(flightId));
            
            // Taking flight object because we can call increment or decrement functions on flight object only 
            const flight = await Flight.findByPk(flightId);

            // + operator attempts to convert the data into a number, 
            // +0 = 0, +1 = 1, +true = 1, +false = 0
            if(+dec){
                await flight.decrement('totalSeats', {by: seats}, {transaction: transaction});
            }
            else{
                await flight.increment('totalSeats', {by: seats}, {transaction: transaction});
            }

            // Updates the seat value in the single query 
            await flight.reload();
            await transaction.commit();
            return flight;
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
        
    }
}

module.exports = FlightRepository;