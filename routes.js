const Router = require('express');

const controller = require('./src/app/controllers/MentorController');

const routes = new Router();

routes.get('/controllers', controller.ListData);
routes.post('/controllers', controller.create);
routes.put('/controllers:id', controller.update);
routes.delete('/controllers:id', controller.delete);

module.exports = routes;