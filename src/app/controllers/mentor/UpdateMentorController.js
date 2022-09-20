import Mentor from "../../models/MentorModel";

class UpdateMentorController {
  async update(req, res) {
    try {
      const { name, phone, chavePix, publicEmail, cnpj } = req.body;
      const userId = req.user;
      const mentor = await Mentor.findOne({
        where: {
          user_id: userId,
        },
      });

      if (!mentor) {
        return res.status(404).json({ error: "Mentor(a) não encontrado(a)." });
      }

      if (cnpj) {
        if (mentor.cnpj != cnpj) {
          const mentorCnpj = await Mentor.findOne({
            where: { cnpj: cnpj },
          });
          if (mentorCnpj) {
            return res.status(400).json({ error: "CNPJ já cadastrado." });
          }
        }
      }

      await mentor.update({ name, phone, chavePix, publicEmail, cnpj });
      return res.status(200).json(mentor);
    } catch (error) {
      return res.status(401).json({ error: error.message });
    }
  }
}

export default new UpdateMentorController();
