import express, { Application } from 'express';
import morgan from 'morgan';
import * as bodyParser from 'body-parser';
import Routes from './routes/routes';
import { errorHandlerApi } from './errorHandlerApi';
import Auth from '../auth';

class Api {
    public express: Application;


    constructor() {
        this.express = express();
        this.middleaware();
    }

    middleaware(): void {
        this.express.use(morgan('dev'));
        this.express.use(bodyParser.urlencoded({ extended: true }));
        this.express.use(bodyParser.json());
        this.express.use(errorHandlerApi);
        this.express.use(Auth.config().initialize());
        this.router(this.express,Auth);
    }

    private router(app: Application, auth:any):void{
       Routes.initRoutes(app, auth);
    }
}

export default new Api().express;
