import Mentor from "../../models/MentorModel";

class UpdateMentorController {
  async update(req, res) {
    const id = req.params.id;
    const { name, phone, chavePix, publicEmail, cnpj } = req.body;

    const mentor = await Mentor.findByPk(id);
    if (!mentor) {
      return res.status(404).json({ Error: "Mentor não encontrado" });
    }

    if (cnpj) {
      if (mentor.cnpj != cnpj) {
        const mentorCnpj = await Mentor.findOne({
          where: { cnpj: cnpj },
        });
        if (mentorCnpj) {
          return res.status(400).json({ erro: "Cnpj já cadastrado" });
        }
      }
    }

    await mentor.update({ name, phone, chavePix, publicEmail, cnpj });
    return res.status(200).json(mentor);
  }
}

export default new UpdateMentorController();
