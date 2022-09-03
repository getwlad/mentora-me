import Sequelize, { Model } from "sequelize";
import databaseConfig from "../../config/database";
import Mentor from "./MentorModel";
import Student from "./StudentModel";

const sequelize = new Sequelize(databaseConfig);

class Particulars extends Model {}

Particulars.init(
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    extrovert: Sequelize.ENUM("1", "2", "3"),
    theory: Sequelize.ENUM("1", "2", "3"),
    practice: Sequelize.ENUM("1", "2", "3"),
    mentoring_in_group: Sequelize.ENUM("1", "2", "3"),
    mentoring_individual: Sequelize.ENUM("1", "2", "3"),
    libras: Sequelize.ENUM("1", "2", "3"),
    minority_groups: Sequelize.ENUM("1", "2", "3"),
  },
  {
    sequelize,
    modelName: "Particulars",
  }
);

Particulars.belongsTo(Student, {
  foreignKey: "student_id",
});

Particulars.belongsTo(Mentor, {
  foreignKey: "mentor_id",
});

export default Particulars;
