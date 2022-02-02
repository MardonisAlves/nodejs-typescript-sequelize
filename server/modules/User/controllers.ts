import { Request, Response } from 'express';
import HTTPStatus from 'http-status';
import userService from '../../modules/User/services';

class UserController {
  
    getAll(req: Request, res: Response) {
        userService.getAll()
            .then((data: any) => {
                res.status(HTTPStatus.OK).json({ 'data': data })
            }).catch(err => {
                res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({ 'err': 'Error interno no servidor' })
            });
    }

    createUser(req: Request, res: Response) {
        const { user } = req.body
        if (!user) throw new Error();
        userService.create(user)
            .then(data => {
                res.status(HTTPStatus.CREATED).json({ data: data });
            }).catch(err => {
                res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({ 'err': 'Error interno no servidor' })
            });
    }

    getById(req: Request, res: Response) {
        const { id } = req.params
        userService.getById(parseInt(id))
            .then((data: any) => {
                res.status(HTTPStatus.OK).json({ data: data.id })
            }).catch(err => {
                res.status(HTTPStatus.NOT_FOUND).json({ 'err': 'Usuário não encontrado' });
            });
    }

    updateUser(req: Request, res: Response) {
        const { user } = req.body;
        const { id } = req.params;
        userService.update(user, parseInt(id))
            .then(data => {
                res.status(HTTPStatus.OK).json({ 'data': 'Usuário atualizado com sucesso!' })
            })
            .catch(err => {
                res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({ 'err': 'Error interno no servidor' });
            });
    }


    deleteUser(req: Request, res: Response) {
        const { id } = req.params;
        userService.delete(parseInt(id))
            .then(data => {
                res.status(HTTPStatus.OK).json({ 'data': 'Usuário deletado com sucesso!' })
            })
            .catch(err => { res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({ 'err': 'Error no servidor interno' })
        })

    }
}


export default UserController
