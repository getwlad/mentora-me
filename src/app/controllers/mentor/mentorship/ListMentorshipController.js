import Mentorship from "../../../models/MentorshipModel";
class ListMentorShipController {
  async list(req, res) {
    try {
      const { id } = req.params;
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
