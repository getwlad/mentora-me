import Sequelize, { Model } from "sequelize";
import databaseConfig from "../../config/database";
import StudentHasInterestArea from "./StudentHasInterestAreaModel";
import Student from "./StudentModel";

const sequelize = new Sequelize(databaseConfig);

class InterestArea extends Model {}

InterestArea.init(
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    mentoring_area: Sequelize.ENUM(
      "PROGRAMAÇÃO",
      "BANCO DE DADOS",
      "DESGINER UX",
      "SEGURANÇA DA INFORMACÃO",
      "QUALIDADE DE SOFTWARE"
    ),
  },
  {
    sequelize,
    modelName: "Interest_Area",
  }
);

InterestArea.belongsToMany(Student, {
  through: {
    model: StudentHasInterestArea,
  },
  foreignKey: "interest_area_id",
  constraints: true,
});

Student.hasMany(InterestArea, {
  through: {
    model: StudentHasInterestArea,
  },
  foreignKey: "student_id",
  constraints: true,
});

export default InterestArea;
