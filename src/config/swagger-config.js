const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0',
        info : {
            title : 'Flights Service API Documentation',
            version: '1.0.0',

        },
        servers: [
            {
                url: 'http://localhost:3000/'
            }
        ]
    },
    apis: ['./src/routes/api/v1/*.js']
}

const swaggerSpec = swaggerJsDoc(options);

const swaggerUiServe = swaggerUi.serve;
const swaggerUiSetup = swaggerUi.setup(swaggerSpec);

module.exports = {
    swaggerUiServe,
    swaggerUiSetup
}