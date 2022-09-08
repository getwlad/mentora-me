import Mentor from "../../models/MentorModel";
class DeleteMentorController {
  async delete(req, res) {
    try {
      const userId = req.user;
      const mentor = await Mentor.findOne({
        where: {
          user_id: userId,
        },
      });

      if (!mentor) {
        return res.status(404).json({ Error: "Mentor não encontrado" });
      }
      await mentor.destroy();
      return res.status(200).json({ msg: "sucesso" });
    } catch (error) {
      return res.status(401).json({ error: error.message });
    }
  }
}

export default new DeleteMentorController();
