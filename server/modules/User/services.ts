import modelUser from '../../models/user';


class User {
    constructor() {}
    create(user: any) {
        return modelUser.create(user)
    }
    getAll(): Promise<modelUser[]> {
        return modelUser.findAll();
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
    update(user:modelUser , id:number): Promise<modelUser | Object> {
        return modelUser.update(user, { where: { id: id },fields:['name','email','password'] });
    }
    delete(id: number): Promise<modelUser | Object> {
        return modelUser.destroy({ where: { id: id } });
    }

}

export default User
