import Mentor from "../../models/MentorModel";
class DeleteMentorController {
  async delete(req, res) {
    const id = req.params.id;

    const mentor = await Mentor.findByPk(id);
    if (!mentor) {
      return res.status(404).json({ Error: "Mentor não encontrado" });
    }
    await mentor.destroy();
    return res.status(200).json({ msg: "sucesso" });
  }
}

export default new DeleteMentorController();
