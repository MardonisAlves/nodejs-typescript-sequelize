import bcrypt from 'bcrypt'
import { Model, DataTypes, Sequelize } from 'sequelize';
import sequelize from '../config/sequelizeConnection';

class User extends Model {
  id: any;
	email: any;
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate() {
    // define association here
  }
}
User.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
     unique: true,
    validate: {
      notEmpty: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
}, {
  sequelize,
  modelName: 'User',
});

User.beforeCreate((user) => {
  return hasPassword(user)
})

User.beforeUpdate((user) => {
  return hasPassword(user)
})

function hasPassword(user:any){
const salt = bcrypt.genSaltSync(10);
user.set('password', bcrypt.hashSync(user.password , salt));
}

export default User;

