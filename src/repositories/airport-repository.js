const BasicCRUDRepository = require("./crud-repositories");
const {Airport} = require('../models')

class AirportRepository extends BasicCRUDRepository{
    constructor(){
        super(Airport);
    }
}

module.exports = AirportRepository;