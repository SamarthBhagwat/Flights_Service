const express = require('express');
const router = express.Router();

const {cityMiddleware} = require('../../../middlewares');
const {cityController} = require('../../../controllers');


/**
 * @swagger
 * /api/v1/cities:
 *  post:
 *      tags:
 *      - City API
 *      summary: Creates a new city
 *      description: Use it to create a new city
 *      requestBody:
 *              required: true
 *              content:
 *                      application/json:
 *                              schema:
 *                                      type: object
 *                                      properties:
 *                                              name:
 *                                                      type: string
 *                                                      description: Name of the city
 *                                                      example: Bengaluru
 *                                              
 *      responses:
 *          201:
 *              description: Creates a city 
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
        cityMiddleware.validateCreateRequest,
        cityController.createCity);

/**
 * @swagger
 * /api/v1/cities:
 *  get:
 *      tags:
 *      - City API
 *      summary: Retrieve a list of cities
 *      description: Use it when you want the list of cities
 *      responses:
 *          200:
 *              description: A list of cities
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
        cityController.getCities);


/**
 * @swagger
 * /api/v1/cities/{id}:
 *  get:
 *      tags:
 *      - City API
 *      summary: Retrieve a specific city by id
 *      description: Use it when you want a specific city by id
 *      parameters:
 *            - in: path
 *              name: id
 *              description: id of the city
 *              required: true
 *      responses:
 *          200:
 *              description: A city with specified id
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
        cityController.getCityById);


/**
  * @swagger
 * /api/v1/cities/{id}:
 *  patch:
 *      tags:
 *      - City API
 *      summary: Update city with specified id
 *      description: Use it to update any property of any city
 *      parameters:
 *            - in: path
 *              name: id
 *              description: id of the city
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
 *                                                      description: Name of the city
 *                                                      example: Banglore
 *                                              
 *      responses:
 *          200:
 *              description: Update city by id 
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
        cityMiddleware.validateUpdateRequest,
        cityController.updateCity);


/**
 * @swagger
 * /api/v1/cities/{id}:
 *  delete:
 *      tags:
 *      - City API
 *      summary: Delete city by id
 *      description: Use it to delete city with specified id
 *      parameters:
 *            - in: path
 *              name: id
 *              description: id of the city
 *              required: true
 *      responses:
 *          200:
 *              description: Delete city by id
 *              content:
 *                      text:
 *                              type: string
 *                              description: Delete method response message
 *                              example: Successfully deleted city with id 4
 */
router.delete('/:id',
        cityController.deleteCity);


module.exports = router;