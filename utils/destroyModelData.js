import User from "../src/app/models/UserModel";
import Mentor from "../src/app/models/MentorModel";
import Student from "../src/app/models/StudentModel";
import InterestArea from "../src/app/models/InterestAreaModel";

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
    }
  }
};
export default destroyModelData;
