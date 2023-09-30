const BasicCRUDRepository = require("./crud-repositories");
const {Flight} = require('../models')

class FlightRepository extends BasicCRUDRepository{
    constructor(){
        super(Flight);
    }

    async getAllFlights(filter){
        const response = await Flight.findAll({
            where: filter
        });
        return response
    }
}

module.exports = FlightRepository;