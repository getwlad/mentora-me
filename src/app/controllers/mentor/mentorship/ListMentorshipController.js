import Mentor from "../../../models/MentorModel";
import Mentorship from "../../../models/MentorshipModel";
class ListMentorShipController {
  async list(req, res) {
    try {
      const userId = req.user;
      const mentor = await Mentor.findOne({
        where: {
          user_id: userId,
        },
      });
      if (!mentor) {
        return res.status(404).json({ error: "Mentor(a) não cadastrado(a)." });
      }
      const { id } = mentor;

      const mentorships = await Mentorship.findAll({
        where: {
          mentor_id: id,
        },
      });
      return res.status(200).json(mentorships);
    } catch (error) {
      return res.status(401).json({ error: error.message });
    }
  }
}

export default new ListMentorShipController();
