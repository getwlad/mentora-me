import Sequelize, { Model } from "sequelize";
import databaseConfig from "../../config/database";
const sequelize = new Sequelize(databaseConfig);

class StudentHasInterestArea extends Model {}

StudentHasInterestArea.init(
  {
    studentId: {
      type: sequelize.UUIDV4(),
      references: {
        model: StudentModel,
        key: id,
      },
    },

    interestAreaId: {
      type: sequelize.UUIDV4(),
      references: {
        model: InterestAreaModel,
        key: id,
      },
    },
  },

  {
    sequelize,
    modelName: "StudentHasInterestArea",
  }
);

export default StudentHasInterestArea;
