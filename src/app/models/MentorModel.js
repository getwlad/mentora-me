import Sequelize, { Model } from "sequelize";
import databaseConfig from "../../config/database";
import User from "./UserModel";
const sequelize = new Sequelize(databaseConfig);

class Mentor extends Model {}

Mentor.init(
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    name: Sequelize.STRING,
    phone: Sequelize.STRING,
    cnpj: Sequelize.STRING,
    publicEmail: Sequelize.STRING,
    chavePix: Sequelize.STRING,
  },
  {
    sequelize,
    modelName: "Mentor",
  }
);

export default Mentor;
