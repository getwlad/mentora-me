import Mentorship from "../../../models/MentorshipModel";
import { Op } from "sequelize";
import Mentor from "../../../models/MentorModel";
class DeleteMentorshipController {
  async delete(req, res) {
    try {
      const { mentorshipId } = req.params;
      const userId = req.user;
      const mentor = await Mentor.findOne({
        where: {
          user_id: userId,
        },
      });
      if (!mentor) {
        return res.status(404).json({ error: "Mentor não cadastrado" });
      }
      const { id } = mentor;
      const mentorship = await Mentorship.findOne({
        where: {
          [Op.and]: [{ id: mentorshipId }, { mentor_id: id }],
        },
      });
      if (!mentorship) {
        return res.status(404).json({ error: "Mentoria não encontrada" });
      }
      await mentorship.destroy();
      return res.status(200).json({ message: "sucesso" });
    } catch (error) {
      return res.status(401).json({ error: error.message });
    }
  }
}

export default new DeleteMentorshipController();
