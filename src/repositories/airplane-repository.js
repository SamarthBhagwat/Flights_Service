const BasicCRUDRepository = require("./crud-repositories");
const {Airplane} = require('../models')

class AirplaneRepository extends BasicCRUDRepository{
    constructor(){
        super(Airplane);
    }
}

module.exports = AirplaneRepository;