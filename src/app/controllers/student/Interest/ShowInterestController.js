import InterestArea from "../../../models/InterestAreaModel";
import Student from "../../../models/StudentModel";

class ShowInterestController {
  async show(req, res) {
    try {
      const userId = req.user;

      const student = await Student.findOne({
        where: {
          user_id: userId,
        },
        include: [
          {
            model: InterestArea,
            as: "interests",
            attributes: ["mentoring_area"],
          },
        ],

        attributes: [],
      });
      if (!student) {
        return res.status(404).json({ error: "Estudante não cadastrado" });
      }

      if (!student.interests.length > 0) {
        return res.status(404).json({ error: "Interesses não registrados" });
      }

      return res.status(200).json(student);
    } catch (error) {
      return res.status(401).json({ error: error.message });
    }
  }
}

export default new ShowInterestController();
