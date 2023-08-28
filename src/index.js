/*
    - This is the entry point of our application.
    - The URL for which the request will come will something be like: -
        GET https:localhost:3000:/api/v1/airplanes
    - To achieve this, first , we will have to create a server and start the server to listen on port 
      3000
    - We can create a server by using express easily, so, we will install express and require it here
    - Now, using express , we will create one express app by calling express()
    - Now, to listen on a specific port, we can use app.listen() 
    - app.listen() generally takes 4 arguements, the other 2 are of no use as of now
     : PORT and callback function are the main where callback function is an optional one.
    - So, now the server is up and running , now we have to handle the incoming requests 
    - Now, if I find /api in the url, we will redirect the request to apiRoutes 
*/

const express = require('express');
const { swaggerUiServe, swaggerUiSetup } = require('./config/swagger-config');
const routes = require('./routes');
const PORT = require('./config/port-config');
const logger = require('./config/logger-config');

const app = express();

app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({extended: true})); // Parse URL-encoded bodies


app.use('/', routes);

app.use('/api-docs', swaggerUiServe, swaggerUiSetup);

app.listen(PORT, async function exec(){
    // console.log(`Server is up and running on port 3000`);
    logger.info(`Server is up and running on port ${PORT}`);
        
});


