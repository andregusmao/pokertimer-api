const express = require('express');
const cors = require('cors');
const requireDir = require('require-dir');
const config = require('./config');
// const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('./swagger.json');

// Start express app
const app = express();
app.use(express.json());
app.use(cors());

// Start mongodb
require('./src/database/mongodb');

// Access to models dir
requireDir('./src/models');

// Use routes
app.use('/api', require('./src/routes'));

// Swagger route
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Start server
app.listen(config.port, (req, res) => {
    console.log(`Server connected at port ${config.port}`);
});