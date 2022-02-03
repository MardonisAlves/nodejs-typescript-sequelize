import modelUser from '../../models/user';
import IUser from '../../modules/User/interface';

class User {

    create(user: any) {
        return modelUser.create(user)
    }
    getAll(): Promise<modelUser[]> {
        return  modelUser.findAll();
    }
    getById(id: number): Promise<modelUser | null> {
        return modelUser.findOne({
            where: {
                id: id
            }
        });
    }

    getByEmail(email: string): Promise<modelUser | null> {
        return modelUser.findOne({
            where: {
                email: email
            }
        });
    }
    update(user:any, id: number): Promise<modelUser | null> {
          return  modelUser.update(user, { where: { id: id }, fields: ['name', 'email'] }).then(() => { return modelUser.findByPk(id) });

    }

    delete(id: number): Promise<modelUser |  number > {
       return  modelUser.destroy({ where: { id: id } });

    }

}

export default  new User();
