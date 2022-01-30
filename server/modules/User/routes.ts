import { Request, Response } from "express";
import UserController from "./controllers";


let userCtrl: UserController;
class UserRoutes {
    constructor() {
        userCtrl = new UserController();
    }

    index(req: Request, res: Response) {
        return userCtrl.getAll(req, res);
    }
    async create(req: Request, res: Response) {
        return userCtrl.createUser(req, res);
    }
    findOne(req: Request, res: Response) {
        return userCtrl.getById(req, res);
    }
    update(req: Request, res: Response) {
        return userCtrl.updateUser(req, res);
    }
    destroy(req: Request, res: Response) {
        return userCtrl.deleteUser(req, res);
    }
}

export default UserRoutes