import express from 'express'
import AppController from '../controllers/AppController'
import UsersController  from '../controllers/UsersController';

const injectRoutes = (api) => {
    api.get('/status', AppController.getStatus);
    api.get('/stats', AppController.getStats);
    // Adding user to the database
    api.post('/users', UsersController.postNew)
}

export default injectRoutes

