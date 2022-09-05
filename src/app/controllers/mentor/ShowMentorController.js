import Mentor from "../../models/MentorModel";

class ShowMentorController {
  async show(req, res) {
    try {
      const id = req.params.id;
      const mentor = await Mentor.findByPk(id);
      if (!mentor) {
        return res.status(404).json({ Error: "Mentor não encontrado" });
      }
      return res.status(200).json(mentor);
    } catch (error) {
      return res.status(401).json({ error: error.message });
    }
  }
}

export default new ShowMentorController();
