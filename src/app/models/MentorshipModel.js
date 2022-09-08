import Sequelize, { Model } from "sequelize";
import databaseConfig from "../../config/database";
import Mentor from "./MentorModel";
import StudentHasCourse from "./StudentHasCourseModel";
import Student from "./StudentModel";
const sequelize = new Sequelize(databaseConfig);

class Mentorship extends Model {}

Mentorship.init(
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    name: Sequelize.STRING,
    price: Sequelize.DECIMAL(10, 2),
  },
  {
    sequelize,
    modelName: "Mentorship",
  }
);

Mentorship.belongsToMany(Student, {
  through: {
    model: StudentHasCourse,
  },
  foreignKey: "student_id",
  constraint: true,
});

Mentorship.belongsToMany(Student, {
  through: StudentHasCourse,
  as: "students",
  foreignKey: "mentorship_id",
  otherKey: "student_id",
  constraints: true,
});

Student.belongsToMany(Mentorship, {
  through: StudentHasCourse,
  as: "mentorships",
  foreignKey: "student_id",
  otherKey: "mentorship_id",
  constraints: true,
});

export default Mentorship;
