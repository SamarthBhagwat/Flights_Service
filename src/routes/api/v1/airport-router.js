const express = require('express');
const router = express.Router();

const {airportMiddleware} = require('../../../middlewares');
const {airportController} = require('../../../controllers');


/**
 * @swagger
 * /api/v1/airports:
 *  post:
 *      tags:
 *      - Airport API
 *      summary: Creates a new airport
 *      description: Use it to create a new airport
 *      requestBody:
 *              required: true
 *              content:
 *                      application/json:
 *                              schema:
 *                                      type: object
 *                                      properties:
 *                                              name:
 *                                                      type: string
 *                                                      description: Name of airport
 *                                                      example: Kempogowda Airport
 *                                              code:
 *                                                      type: string
 *                                                      description: Code of airport
 *                                                      example: BLR
 *                                              cityId:
 *                                                      type: integer
 *                                                      description: City id in which airport belongs to
 *                                                      example: 3
 *      responses:
 *          201:
 *              description: Creates an airport 
 *              content:
 *                      application/json:
 *                              schema:
 *                                      type: object
 *                                      properties:
 *                                                      id: 
 *                                                              type: integer
 *                                                              description: ID of the airplane
 *                                                              example: 1
 *                                                      name:
 *                                                              type: string
 *                                                              description: Model number of the airplane
 *                                                              example: Airbus A320
 *                                                      code:
 *                                                              type: string
 *                                                              description: Code of airport
 *                                                              example: BLR
 *                                                      cityId:
 *                                                              type: integer
 *                                                              description: Id of city to which airport belongs to
 *                                                              example: 3
 *                                                      createdAt:
 *                                                              type: date-time
 *                                                              description: Date and time of creation of airplane
 *                                                              example: 2023-08-05T14:39:35.000Z
 *                                                      updatedAt:
 *                                                              type: date-time
 *                                                              description: Date and time of last updation of airplane
 *                                                              example: 2023-08-05T14:39:35.000Z
 */
router.post('/' , 
        airportMiddleware.validateCreateRequest,
        airportController.createAirport);

/**
 * @swagger
 * /api/v1/airports:
 *  get:
 *      tags:
 *      - Airport API
 *      summary: Retrieve a list of airports
 *      description: Use it when you want the list of airports
 *      responses:
 *          200:
 *              description: A list of airports
 *              content:
 *                      application/json:
 *                              schema:
 *                                      type: array
 *                                      items:
 *                                              type: object
 *                                              properties:
 *                                                      id: 
 *                                                              type: integer
 *                                                              description: ID of the airplane
 *                                                              example: 1
 *                                                      name:
 *                                                              type: string
 *                                                              description: Model number of the airplane
 *                                                              example: Airbus A320
 *                                                      code:
 *                                                              type: string
 *                                                              description: Code of airport
 *                                                              example: BLR
 *                                                      cityId:
 *                                                              type: integer
 *                                                              description: Id of city to which airport belongs to
 *                                                              example: 3
 *                                                      createdAt:
 *                                                              type: date-time
 *                                                              description: Date and time of creation of airplane
 *                                                              example: 2023-08-05T14:39:35.000Z
 *                                                      updatedAt:
 *                                                              type: date-time
 *                                                              description: Date and time of last updation of airplane
 *                                                              example: 2023-08-05T14:39:35.000Z
 *                                                      
 */
router.get('/',
        airportController.getAirports);


/**
 * @swagger
 * /api/v1/airports/{id}:
 *  get:
 *      tags:
 *      - Airport API
 *      summary: Retrieve a specific airport by id
 *      description: Use it when you want a specific airport by id
 *      parameters:
 *            - in: path
 *              name: id
 *              description: id of the airport
 *              required: true
 *      responses:
 *          200:
 *              description: An airport with specified id
 *              content:
 *                      application/json:
 *                              schema:
 *                                      type: object
 *                                      properties:
 *                                                      id: 
 *                                                              type: integer
 *                                                              description: ID of the airplane
 *                                                              example: 1
 *                                                      name:
 *                                                              type: string
 *                                                              description: Model number of the airplane
 *                                                              example: Airbus A320
 *                                                      code:
 *                                                              type: string
 *                                                              description: Code of airport
 *                                                              example: BLR
 *                                                      cityId:
 *                                                              type: integer
 *                                                              description: Id of city to which airport belongs to
 *                                                              example: 3
 *                                                      createdAt:
 *                                                              type: date-time
 *                                                              description: Date and time of creation of airplane
 *                                                              example: 2023-08-05T14:39:35.000Z
 *                                                      updatedAt:
 *                                                              type: date-time
 *                                                              description: Date and time of last updation of airplane
 *                                                              example: 2023-08-05T14:39:35.000Z
 *                                            
 */
router.get('/:id', 
        airportController.getAirportById);


/**
 * @swagger
 * /api/v1/airports/{id}:
 *  patch:
 *      tags:
 *      - Airport API
 *      summary: Update airport with specified id
 *      description: Use it to update any property of any airport
 *      parameters:
 *            - in: path
 *              name: id
 *              description: id of the airport
 *              required: true
 *      requestBody:
 *              required: true
 *              content:
 *                      application/json:
 *                              schema:
 *                                      type: object
 *                                      properties:
 *                                              name:
 *                                                      type: string
 *                                                      description: Model number of the airplane
 *                                                      example: Airbus A320
 *                                              code:
 *                                                      type: string
 *                                                      description: Code of airport
 *                                                      example: BLR
 *                                              cityId:
 *                                                      type: integer
 *                                                      description: Id of city to which airport belongs to
 *                                                      example: 3
 *      responses:
 *          200:
 *              description: Update airport by id 
 *              content:
 *                      application/json:
 *                              schema:
 *                                      type: object
 *                                      properties:
 *                                                      id: 
 *                                                              type: integer
 *                                                              description: ID of the airplane
 *                                                              example: 1
 *                                                      name:
 *                                                              type: string
 *                                                              description: Model number of the airplane
 *                                                              example: Airbus A320
 *                                                      code:
 *                                                              type: string
 *                                                              description: Code of airport
 *                                                              example: BLR
 *                                                      cityId:
 *                                                              type: integer
 *                                                              description: Id of city to which airport belongs to
 *                                                              example: 3
 *                                                      createdAt:
 *                                                              type: date-time
 *                                                              description: Date and time of creation of airplane
 *                                                              example: 2023-08-05T14:39:35.000Z
 *                                                      updatedAt:
 *                                                              type: date-time
 *                                                              description: Date and time of last updation of airplane
 *                                                              example: 2023-08-05T14:39:35.000Z
 */
router.patch('/:id', 
        airportMiddleware.validateUpdateRequest,
        airportController.updateAirport);


/**
 * @swagger
 * /api/v1/airports/{id}:
 *  delete:
 *      tags:
 *      - Airport API
 *      summary: Delete airport by id
 *      description: Use it to delete airport with specified id
 *      parameters:
 *            - in: path
 *              name: id
 *              description: id of the airport
 *              required: true
 *      responses:
 *          200:
 *              description: Delete airport by id
 *              content:
 *                      text:
 *                              type: string
 *                              description: Delete method response message
 *                              example: Successfully deleted airport with id 4
 */
router.delete('/:id',
        airportController.deleteAirport);


module.exports = router;