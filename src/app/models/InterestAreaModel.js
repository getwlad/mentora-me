import Sequelize, { Model } from "sequelize";
import databaseConfig from "../../config/database";

import Student from "./StudentModel";
import StudentHasInterestArea from "./StudentHasInterestAreaModel";
const sequelize = new Sequelize(databaseConfig);

class InterestArea extends Model {}

InterestArea.init(
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    mentoring_area: Sequelize.STRING,
  },
  {
    sequelize,
    modelName: "InterestArea",
  }
);

InterestArea.belongsToMany(Student, {
  through: StudentHasInterestArea,
  as: "students",
  foreignKey: "interest_area_id",
  otherKey: "student_id",
  constraints: true,
});

Student.belongsToMany(InterestArea, {
  through: StudentHasInterestArea,
  as: "interests",
  foreignKey: "student_id",
  otherKey: "interest_area_id",
  constraints: true,
});

export default InterestArea;
