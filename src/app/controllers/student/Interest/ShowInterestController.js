import InterestArea from "../../../models/InterestAreaModel";
import Student from "../../../models/StudentModel";
class ShowInterestController {
  async show(req, res) {
    try {
      const id = req.params.id;
      const student = await InterestArea.findAll({
        attributes: ["mentoring_area"],
        include: [
          {
            model: Student,
            as: "students",
            through: {
              where: { student_id: id },
              attributes: [],
            },
            attributes: [],
          },
        ],
      });
      return res.status(200).json(student);
    } catch (error) {
      return res.status(401).json({ error: error.message });
    }
  }
}

export default new ShowInterestController();
