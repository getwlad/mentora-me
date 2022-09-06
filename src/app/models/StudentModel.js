import Sequelize, { Model } from "sequelize";
import databaseConfig from "../../config/database";
const sequelize = new Sequelize(databaseConfig);
import Particulars from "./ParticularsModel";
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

Student.hasOne(Particulars, {
  foreignKey: "student_id",
});
Particulars.belongsTo(Student, {
  foreignKey: "student_id",
});

export default Student;
