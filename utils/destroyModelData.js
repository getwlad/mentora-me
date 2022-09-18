import User from "../src/app/models/UserModel";
import Mentor from "../src/app/models/MentorModel";
import Student from "../src/app/models/StudentModel";
import InterestArea from "../src/app/models/InterestAreaModel";
import StudentHasInterestArea from "../src/app/models/StudentHasInterestAreaModel";

const destroyModelData = async () => {
  await Mentor.destroy({ where: {} });
  await Student.destroy({ where: {} });
  await InterestArea.destroy({ where: {} });
  await User.destroy({ where: {} });
};
export default destroyModelData;
