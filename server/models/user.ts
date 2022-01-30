
import { Model, DataTypes, Sequelize } from 'sequelize';
import sequelize from '../config/sequelizeConnection';

 class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
 User.init({
    name:{
     type: DataTypes.STRING,
     allowNull:false,
     validate: {
       notEmpty:true
     }
    }, 
    email:{
     type: DataTypes.STRING,
    allowNull:false,
    validate:{
      notEmpty:true
    }
    },
    password:{
     type: DataTypes.STRING,
    allowNull:false,
    validate:{
      notEmpty:true
    }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  
export default User;

