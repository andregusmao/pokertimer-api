const express = require('express');
const routes = express.Router();

/**
 * Controllers
 */

// Structures
const StructureController = require('./controllers/StructureController');

// Tournaments
const TournamentController = require('./controllers/TournamentController');

// Users
const UserController = require('./controllers/UserController');

/**
 * Routes
 */

// Swagger
// router.use('/', swaggerUi.serve);
// router.get('/', swaggerUi.setup(swaggerDocument));

// Structures
routes.get('/structures', UserController.verify, StructureController.index);
routes.get('/structures/:id', UserController.verify, StructureController.show);
routes.post('/structures', UserController.verifyAdmin, StructureController.store);
routes.put('/structures/:id', UserController.verifyAdmin, StructureController.update);
routes.delete('/structures/:id', UserController.verifyAdmin, StructureController.destroy);

// Tournaments
routes.get('/tournaments', UserController.verify, TournamentController.index);
routes.get('/tournaments/:id', UserController.verify, TournamentController.show);
routes.post('/tournaments', UserController.verifyAdmin, TournamentController.store);
routes.put('/tournaments/:id', UserController.verifyAdmin, TournamentController.update);
routes.delete('/tournaments/:id', UserController.verifyAdmin, TournamentController.destroy);

// Users
routes.get('/users', UserController.verify, UserController.index);
routes.get('/users/:id', UserController.verify, UserController.show);
routes.post('/users', UserController.store);
routes.put('/users/:id', UserController.verifyAdmin, UserController.update);
routes.delete('/users/:id', UserController.verifyAdmin, UserController.destroy);

// Authentication
routes.post('/login', UserController.login);

module.exports = routes;