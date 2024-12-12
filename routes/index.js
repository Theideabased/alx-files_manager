import express from 'express'
import AppController from '../controllers/AppController';
import UsersController  from '../controllers/UsersController';
import AuthController from '../controllers/AuthController';

const injectRoutes = (api) => {
    api.get('/status', AppController.getStatus);
    api.get('/stats', AppController.getStats);
    // Adding user to the database
    api.post('/users', UsersController.postNew);
    api.get('/users/me', UsersController.getMe);

    // Authenticating the users
    api.get('/connect', AuthController.getConnect);
    api.get('/disconnect', AuthController.getDisconnect)
}

export default injectRoutes

