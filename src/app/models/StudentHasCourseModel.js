import Sequelize, { Model } from "sequelize";
import databaseConfig from "../../config/database";
const sequelize = new Sequelize(databaseConfig);

class StudentHasCourse extends Model {}

StudentHasCourse.init(
  {
    student_id: {
      type: Sequelize.UUIDV4,
    },

    mentorship_id: {
      type: Sequelize.UUIDV4,
    },
  },

  {
    sequelize,
    modelName: "StudentHasCourse",
    timestamps: false,
  }
);

export default StudentHasCourse;
