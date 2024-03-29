import Mentor from "../../../models/MentorModel";
import Mentorship from "../../../models/MentorshipModel";
class CreateMentorshipController {
  async create(req, res) {
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
      const { name, price } = req.body;

      const mentorship = await Mentorship.create({
        name,
        price,
        mentor_id: id,
      });

      return res.status(201).json(mentorship);
    } catch (error) {
      return res.status(401).json({ error: error.message });
    }
  }
}

export default new CreateMentorshipController();
