const express = require('express');
const router = express.Router();

const {airplaneMiddleware} = require('../../../middlewares');
const {airplaneController} = require('../../../controllers');


/**
 * @swagger
 * /api/v1/airplanes:
 *  post:
 *      tags:
 *      - Airplane API
 *      summary: Creates a new airplane
 *      description: Use it to create a new airplane
 *      requestBody:
 *              required: true
 *              content:
 *                      application/json:
 *                              schema:
 *                                      type: object
 *                                      properties:
 *                                              modelNumber:
 *                                                      type: string
 *                                                      description: Model number of airplane
 *                                                      example: Airbus A320
 *                                              capacity:
 *                                                      type: integer
 *                                                      description: Capacity of airplane
 *                                                      example: 400
 *      responses:
 *          201:
 *              description: Creates an airplane 
 *              content:
 *                      application/json:
 *                              schema:
 *                                      type: object
 *                                      properties:
 *                                                      id: 
 *                                                              type: integer
 *                                                              description: ID of the airplane
 *                                                              example: 1
 *                                                      modelNumber:
 *                                                              type: string
 *                                                              description: Model number of the airplane
 *                                                              example: Airbus A320
 *                                                      capacity:
 *                                                              type: integer
 *                                                              description: Seating capacity of the airplane
 *                                                              example: 400
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
        airplaneMiddleware.validateCreateRequest,
        airplaneController.createAirplane);

/**
 * @swagger
 * /api/v1/airplanes:
 *  get:
 *      tags:
 *      - Airplane API
 *      summary: Retrieve a list of airplanes
 *      description: Use it when you want the list of airplanes
 *      responses:
 *          200:
 *              description: A list of airplanes
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
 *                                                      modelNumber:
 *                                                              type: string
 *                                                              description: Model number of the airplane
 *                                                              example: Airbus A320
 *                                                      capacity:
 *                                                              type: integer
 *                                                              description: Seating capacity of the airplane
 *                                                              example: 400
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
        airplaneController.getAirplanes);


/**
 * @swagger
 * /api/v1/airplanes/{id}:
 *  get:
 *      tags:
 *      - Airplane API
 *      summary: Retrieve a specific airplane by id
 *      description: Use it when you want a specific airplane by id
 *      parameters:
 *            - in: path
 *              name: id
 *              description: id of the airplane
 *              required: true
 *      responses:
 *          200:
 *              description: An airplane with specified id
 *              content:
 *                      application/json:
 *                              schema:
 *                                      type: object
 *                                      properties:
 *                                                      id: 
 *                                                              type: integer
 *                                                              description: ID of the airplane
 *                                                              example: 1
 *                                                      modelNumber:
 *                                                              type: string
 *                                                              description: Model number of the airplane
 *                                                              example: Airbus A320
 *                                                      capacity:
 *                                                              type: integer
 *                                                              description: Seating capacity of the airplane
 *                                                              example: 400
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
        airplaneController.getAirplaneById);


/**
  * @swagger
 * /api/v1/airplanes/{id}:
 *  patch:
 *      tags:
 *      - Airplane API
 *      summary: Update airplane with specified id
 *      description: Use it to update any property of any airplane
 *      parameters:
 *            - in: path
 *              name: id
 *              description: id of the airplane
 *              required: true
 *      requestBody:
 *              required: true
 *              content:
 *                      application/json:
 *                              schema:
 *                                      type: object
 *                                      properties:
 *                                              modelNumber:
 *                                                      type: string
 *                                                      description: Model number of airplane
 *                                                      example: Airbus A320
 *                                              capacity:
 *                                                      type: integer
 *                                                      description: Capacity of airplane
 *                                                      example: 400
 *      responses:
 *          200:
 *              description: Update airplane by id 
 *              content:
 *                      application/json:
 *                              schema:
 *                                      type: object
 *                                      properties:
 *                                                      id: 
 *                                                              type: integer
 *                                                              description: ID of the airplane
 *                                                              example: 1
 *                                                      modelNumber:
 *                                                              type: string
 *                                                              description: Model number of the airplane
 *                                                              example: Airbus A320
 *                                                      capacity:
 *                                                              type: integer
 *                                                              description: Seating capacity of the airplane
 *                                                              example: 400
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
        airplaneMiddleware.validateUpdateRequest,
        airplaneController.updateAirplane);


/**
 * @swagger
 * /api/v1/airplanes/{id}:
 *  delete:
 *      tags:
 *      - Airplane API
 *      summary: Delete airplane by id
 *      description: Use it to delete airplane with specified id
 *      parameters:
 *            - in: path
 *              name: id
 *              description: id of the airplane
 *              required: true
 *      responses:
 *          200:
 *              description: Delete airplane by id
 *              content:
 *                      text:
 *                              type: string
 *                              description: Delete method response message
 *                              example: Successfully deleted airplane with id 4
 */
router.delete('/:id',
        airplaneController.deleteAirplane);


module.exports = router;