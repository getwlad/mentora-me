import Mentor from "../../../models/MentorModel";
import Particulars from "../../../models/ParticularsModel";
class ShowMentorParticularsController {
  async show(req, res) {
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
      const particulars = await Particulars.findOne({
        where: { mentor_id: id },
      });
      if (!particulars) {
        return res
          .status(404)
          .json({ error: "Características não cadastradas." });
      }
      return res.status(200).json(particulars);
    } catch (error) {
      return res
        .status(401)
        .json({ error: "Acesso não autorizado: login necessário." });
    }
  }
}

export default new ShowMentorParticularsController();
