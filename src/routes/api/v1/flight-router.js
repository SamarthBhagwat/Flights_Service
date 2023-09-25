const express = require('express');
const router = express.Router();

const {flightMiddleware} = require('../../../middlewares');
const {flightController} = require('../../../controllers');


/**
 * @swagger
 * /api/v1/flights:
 *  post:
 *      tags:
 *      - Flights API
 *      summary: Creates a new flight
 *      description: Use it to create a new flight
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
 *              description: Creates a flight 
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
        flightMiddleware.validateCreateRequest,
        flightController.createFlight);


module.exports = router;