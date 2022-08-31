import User from "../../models/UserModel";
import Mentor from "../../models/MentorModel";
import CreateMentorService from "../../services/mentor/CreateMentorService";

class CreateMentorController {
  constructor() {}
  async create(req, res) {
    const { name, phone, chavePix, publicEmail, cnpj } = req.body;
    const userId = req.params.user;
    const cnpjCadastrado = await Mentor.findOne({ where: { cnpj: cnpj } });
    const userCadastrado = await Mentor.findOne({
      where: { user_id: userId },
    });
    const userExist = await User.findByPk(userId);

    if (!userExist) {
      return res.status(400).json({ error: "usuário não existe" });
    }

    if (cnpjCadastrado) {
      return res.status(400).json({ error: "cnpj já cadastrado" });
    }

    if (userCadastrado) {
      return res.status(400).json({ error: "mentor já cadastrado" });
    }

    const mentor = await CreateMentorService.createMentor(
      name,
      phone,
      chavePix,
      publicEmail,
      cnpj,
      userId
    );

    return res.status(200).json(mentor);
  }
}

export default new CreateMentorController();
