import Mentorship from "../../../models/MentorshipModel";
import Student from "../../../models/StudentModel";

class ListBuyedMentorshipController {
  async list(req, res) {
    try {
      const { id } = req.params;
      const student = await Student.findOne({
        where: {
          id,
        },
        attributes: [],
        include: [{ model: Mentorship, as: "mentorships" }],
      });
      return res.status(200).json(student);
    } catch (error) {
      return res.status(401).json({ error: error.message });
    }
  }
}

export default new ListBuyedMentorshipController();
