import Mentorship from "../../../models/MentorshipModel";
import { Op } from "sequelize";
class DeleteMentorshipController {
  async delete(req, res) {
    try {
      const { id, mentorshipId } = req.params;
      const mentorship = await Mentorship.findOne({
        where: {
          [Op.and]: [{ id: mentorshipId }, { mentor_id: id }],
        },
      });
      if (!mentorship) {
        return res.status(401).json({ error: "Mentoria não encontrada" });
      }
      await mentorship.destroy();
      return res.status(200).json({ message: "sucesso" });
    } catch (error) {
      return res.status(401).json({ error: error.message });
    }
  }
}

export default new DeleteMentorshipController();
