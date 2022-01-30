import { Sequelize ,Dialect} from "sequelize";
import config from '../config/config.json';
const pgdialect:any = config.development.dialect

const sqConnection = new Sequelize(
    config.development.database,
    config.development.username,
    config.development.password,{
    host: config.development.host,
    dialect: pgdialect
    });


    export default sqConnection;