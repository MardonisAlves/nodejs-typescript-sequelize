import {Request, Response} from 'express';
import * as _ from 'lodash';
import User from '../User/services';
import authSuccess from '../../api/responses/authSuccess';
import {authFail} from '../../api/responses/authFails';



class TokenRoutes {

    auth(req:Request, res:Response){
       const credentials = {
          email: req.body.email,
          password:req.body.password 
       } 
       if(credentials.hasOwnProperty('email') && credentials.hasOwnProperty('password')){
        User.getByEmail(credentials.email)
        .then(_.partial(authSuccess, res, credentials))
        .catch(_.partial(authFail, req, res))
       }
    }
}

export default TokenRoutes