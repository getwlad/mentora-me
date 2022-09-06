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
    mentoring_area: Sequelize.ENUM(
      "PROGRAMAÇÃO",
      "BANCO DE DADOS",
      "DESIGNER UX",
      "SEGURANÇA DA INFORMAÇÃO",
      "QUALIDADE DE SOFTWARE"
    ),
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

export default Mentorship;
