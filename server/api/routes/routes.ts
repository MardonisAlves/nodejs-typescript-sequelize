import { Application} from "express";
import UserRoutes from "../../modules/User/routes";
import TokenRoutes from '../../modules/auth/auth';
class Routes {

    initRoutes(app: Application, auth:any): void {
        app.route('/api/users/all').all(auth.config().authenticate()).get(UserRoutes.index);
        app.route('/api/users/create').post(UserRoutes.create);
        app.route('/api/users/:id').all(auth.config().authenticate()).get(UserRoutes.findOne);
        app.route('/api/users/:id/update').all(auth.config().authenticate()).put(UserRoutes.update);
        app.route('/api/users/:id/destroy').all(auth.config().authenticate()).delete(UserRoutes.destroy);
        app.route('/token').post(TokenRoutes.auth);
    }
}

export default new Routes();