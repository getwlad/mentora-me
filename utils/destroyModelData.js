import User from "../src/app/models/UserModel";
import Mentor from "../src/app/models/MentorModel";
import Student from "../src/app/models/StudentModel";
import InterestArea from "../src/app/models/InterestAreaModel";
import { BOOLEAN, Sequelize } from "sequelize";
import database from "../src/config/database";
import Particulars from "../src/app/models/ParticularsModel";

const setAdminTrue = async () => {
  const sequelize = new Sequelize(database);
  const queryInterface = sequelize.getQueryInterface();
  await Particulars.destroy({ where: {} });
  await User.destroy({ where: {} });
  await queryInterface.changeColumn("user", "is_admin", {
    type: BOOLEAN,
    defaultValue: true,
    allowNull: false,
  });
};
const setAdminFalse = async () => {
  const sequelize = new Sequelize(database);
  const queryInterface = sequelize.getQueryInterface();
  await queryInterface.changeColumn("user", "is_admin", {
    type: BOOLEAN,
    defaultValue: false,
    allowNull: false,
  });
};
const destroyModelData = async (models) => {
  for (let model of models) {
    switch (model) {
      case "User":
        await User.destroy({ where: {} });
        break;
      case "Mentor":
        await Mentor.destroy({ where: {} });
        break;
      case "Student":
        await Student.destroy({ where: {} });
        break;
      case "InterestArea":
        await InterestArea.destroy({ where: {} });
        break;
      case "Particulars":
        await Particulars.destroy({ where: {} });
        break;
      default:
        break;
    }
  }
};
export default destroyModelData;

export { setAdminTrue, setAdminFalse };
