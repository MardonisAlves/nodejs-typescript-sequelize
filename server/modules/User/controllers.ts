import { Request, Response } from 'express';
import * as _ from 'lodash';
import userService from '../../modules/User/services';
import {onError} from '../../api/responses/errorHandlers';
import {onSuccess} from '../../api/responses/successHandlers';
import {dbErrorHandlers}  from '../../config/dbErrorHandlers';
import {onCreate}  from '../../api/responses/onCreate';

class UserController {
    getAll(req: Request, res: Response) {
        userService.getAll()
            .then(_.partial(onSuccess ,res))
            .catch(_.partial(onError, res, `Error ao buscar usuarios`));
    }

    createUser(req: Request, res: Response) {
        const { user } = req.body
        if (!user) throw new Error();
        userService.create(user)
            .then(_.partial(onCreate, res))
            .catch(_.partial(dbErrorHandlers, res))
            .catch(_.partial(onError, res, 'Error ao inserir nono usuario'));
    }

    getById(req: Request, res: Response) {
        const { id } = req.params
        userService.getById(parseInt(id))
            .then(_.partial(onSuccess, res))
            .catch(_.partial(onError, res, 'Usuario não encontrado'));
    }

    updateUser(req: Request, res: Response) {
        const user = req.body
        const { id } = req.params;
        console.log('controller' + user)
        userService.update(user, parseInt(id))
            .then(_.partial(onSuccess, res))
            .catch(_.partial(onError, res, `Falha ao atualiazar usuario`));
    }


    deleteUser(req: Request, res: Response) {
        const { id } = req.params;
        userService.delete(parseInt(id))
            .then(_.partial(onSuccess, res))
            .catch(_.partial(dbErrorHandlers,res))
        }


}


export default UserController
