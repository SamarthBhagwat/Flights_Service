const BasicCRUDRepository = require("./crud-repositories");
const {City} = require('../models')

class CityRepository extends BasicCRUDRepository{
    constructor(){
        super(City);
    }
}

module.exports = CityRepository;