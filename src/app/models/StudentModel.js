import Sequelize, { Model } from "sequelize";
import databaseConfig from "../../config/database";
import User from "./UserModel";
const sequelize = new Sequelize(databaseConfig);

class Student extends Model {}

Student.init(
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    name: Sequelize.STRING,
    phone: Sequelize.STRING,
    cpf: Sequelize.STRING,
    points: Sequelize.STRING,
  },
  {
    sequelize,
    modelName: "Student",
  }
);

export default Student;
