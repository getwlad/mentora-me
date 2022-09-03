import Sequelize, { Model } from "sequelize";
import databaseConfig from "../../config/database";
const sequelize = new Sequelize(databaseConfig);

class StudentHasCourse extends Model {}

StudentHasCourse.init(
  {
    studentId: {
      type: sequelize.UUIDV4(),
      references: {
        model: StudentModel,
        key: id,
      },
    },

    mentorshipId: {
      type: sequelize.UUIDV4(),
      references: {
        model: MentorshipModel,
        key: id,
      },
    },
  },

  {
    sequelize,
    modelName: "StudentHasCourse",
  }
);

export default StudentHasCourse;
