import express, { application, Router } from 'express'
import AppController from '../controllers/AppController';
import UsersController  from '../controllers/UsersController';
import AuthController from '../controllers/AuthController';
import FilesController from '../controllers/FilesController';

const injectRoutes = (api) => {
    api.get('/status', AppController.getStatus);
    api.get('/stats', AppController.getStats);
    // Adding user to the database
    api.post('/users', UsersController.postNew);
    api.get('/users/me', UsersController.getMe);

    // Authenticating the users
    api.get('/connect', AuthController.getConnect);
    api.get('/disconnect', AuthController.getDisconnect)

    //should create a new file in DB and in disk
    api.post('/files', FilesController.getShow);

    //should retrieve the file document bsed on the ID
    api.get('/files/:id', FilesController.getIndex);

    // should set isPublic to false on the file document based on the ID
    api.put('/files/:id/unpublish', FilesController.putUnpublish);

    //should return the content of the file document based on the ID
    api.get('/files/:id/data', FilesController.getFile)
}

export default injectRoutes

