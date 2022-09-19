import Mentor from "../../../models/MentorModel";
import Particulars from "../../../models/ParticularsModel";
class UpdateMentorParticularsController {
  async update(req, res) {
    try {
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
      const {
        extrovert,
        theory,
        practice,
        mentoringInGroup,
        mentoringIndividual,
        libras,
        minorityGroups,
      } = req.body;
      const particulars = await Particulars.findOne({
        where: {
          mentor_id: id,
        },
      });
      if (!particulars) {
        return res.status(404).json({
          error: "caracteristicas não cadastradas",
        });
      }
      await particulars.update({
        extrovert,
        theory,
        practice,
        mentoring_in_group: mentoringInGroup,
        mentoring_individual: mentoringIndividual,
        libras,
        minority_groups: minorityGroups,
      });
      return res.status(200).json(particulars);
    } catch (error) {
      return res.status(401).json({ error: error.message });
    }
  }
}
export default new UpdateMentorParticularsController();
