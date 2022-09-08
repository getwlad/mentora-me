import Mentorship from "../../../models/MentorshipModel";
import ListInterestService from "../../../services/interest/ListInterestService";
class CreateMentorshipController {
  async create(req, res) {
    try {
      const { id } = req.params;
      const { name, price } = req.body;

      const mentorship = await Mentorship.create({
        name,
        price,
        mentor_id: id,
      });

      return res.status(200).json(mentorship);
    } catch (error) {
      return res.status(401).json({ error: error.message });
    }
  }
}

export default new CreateMentorshipController();
