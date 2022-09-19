import Mentorship from "../../models/MentorshipModel";
import { Op } from "sequelize";
class ListAllMentorshipController {
  async list(req, res) {
    try {
      const mentorships = await Mentorship.findAll({
        where: {
          mentor_id: { [Op.ne]: null },
        },
      });
      return res.status(200).json(mentorships);
    } catch (error) {
      return res
        .status(401)
        .json({ error: "Acesso não autorizado: login necessário." });
    }
  }
}

export default new ListAllMentorshipController();
