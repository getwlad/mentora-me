import Mentorship from "../../../models/MentorshipModel";
import { Op } from "sequelize";
class UpdateMentorshipController {
  async update(req, res) {
    try {
      const { id, mentorshipId } = req.params;
      const { name, price } = req.body;
      const mentorship = await Mentorship.findOne({
        where: {
          [Op.and]: [{ id: mentorshipId }, { mentor_id: id }],
        },
      });
      if (!mentorship) {
        return res.status(401).json({ error: "Mentoria não encontrada" });
      }
      mentorship.update({
        name,
        price,
      });

      return res.status(200).json(mentorship);
    } catch (error) {
      return res.status(401).json({ error: error.message });
    }
  }
}

export default new UpdateMentorshipController();
