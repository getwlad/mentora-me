import Mentor from "../../models/MentorModel";

class ShowMentorController {
  async show(req, res) {
    const id = req.params.id;
    const mentor = await Mentor.findByPk(id);
    if (!mentor) {
      return res.status(404).json({ Error: "Mentor não encontrado" });
    }
    return res.status(200).json(mentor);
  }
}

export default new ShowMentorController();
