import Sequelize, { Model } from "sequelize";
import databaseConfig from "../../config/database";
const sequelize = new Sequelize(databaseConfig);
import Student from "./StudentModel";
import InterestArea from "./InterestAreaModel";

class StudentHasInterestArea extends Model {}

StudentHasInterestArea.init(
  {
    student_id: {
      type: Sequelize.UUIDV4,
      references: {
        model: Student,
        key: "id",
      },
    },

    interest_area_id: {
      type: Sequelize.UUIDV4,
      references: {
        model: InterestArea,
        key: "id",
      },
    },
  },

  {
    sequelize,
    modelName: "StudentHasInterestArea",
    timestamps: false,
  }
);

export default StudentHasInterestArea;
