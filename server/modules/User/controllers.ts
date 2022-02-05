import { Request, Response } from 'express';
import * as _ from 'lodash';
import userService from '../../modules/User/services';
import Handlers from '../../api/responses/handlers';
class UserController {

    getAll(req: Request, res: Response) {
        userService.getAll()
            .then(_.partial(Handlers.onSuccess ,res))
            .catch(_.partial(Handlers.onError, res, `Error ao buscar usuarios`));
    }

    createUser(req: Request, res: Response) {
        const { user } = req.body
        userService.create(user)
            .then(_.partial(Handlers.onCreate, res))
            .catch(_.partial(Handlers.dbErrorHandlers, res))
            .catch(_.partial(Handlers.onError, res, 'Error ao inserir nono usuario'));
    }

    getById(req: Request, res: Response) {
        const { id } = req.params
        userService.getById(parseInt(id))
            .then(_.partial(Handlers.onSuccess, res))
            .catch(_.partial(Handlers.onError, res, 'Usuario não encontrado'));
    }

    updateUser(req: Request, res: Response) {
        const user = req.body
        const { id } = req.params;
        console.log('controller' + user)
        userService.update(user, parseInt(id))
            .then(_.partial(Handlers.onSuccess, res))
            .catch(_.partial(Handlers.onError, res, `Falha ao atualiazar usuario`));
    }


    deleteUser(req: Request, res: Response) {
        const { id } = req.params;
        userService.delete(parseInt(id))
            .then(_.partial(Handlers.onSuccess, res))
            .catch(_.partial(Handlers.dbErrorHandlers,res))
        }


}


export default new  UserController();
