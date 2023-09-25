const BasicCRUDRepository = require("./crud-repositories");
const {Flight} = require('../models')

class FlightRepository extends BasicCRUDRepository{
    constructor(){
        super(Flight);
    }
}

module.exports = FlightRepository;