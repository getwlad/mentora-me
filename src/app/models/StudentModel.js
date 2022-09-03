import Sequelize, { Model } from "sequelize";
import databaseConfig from "../../config/database";
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

// Student.belongsTo(User, { foreignKey: "user_id", targetKey: "id" });

export default Student;
