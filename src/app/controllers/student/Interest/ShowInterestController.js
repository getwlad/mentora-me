import InterestArea from "../../../models/InterestAreaModel";
import Student from "../../../models/StudentModel";

class ShowInterestController {
  async show(req, res) {
    try {
      const id = req.params.id;

      const student = await Student.findOne({
        where: {
          id,
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
        return res.status(401).json({ error: "Estudante não cadastrado" });
      }

      return res.status(200).json(student);
    } catch (error) {
      return res.status(401).json({ error: error.message });
    }
  }
}

export default new ShowInterestController();
