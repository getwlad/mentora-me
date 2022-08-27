import CreateMentorService from "../../services/mentor/CreateMentorService";
import CheckEmailCpf from "../../services/mentor/CheckMentorEmailCpf";

export default class CreateMentorController {
  constructor() {}
  create(req, res) {
    const { name, email, password, cpf, publicEmail, phone, chavePix } =
      req.body;

    const cpfCadastrado = CheckEmailCpf.checkCPF(cpf);
    const emailCadastrado = CheckEmailCpf.checkEmail(email);
    if (cpfCadastrado) {
      return res.status(400).json(cpfCadastrado);
    }
    if (emailCadastrado) {
      return res.status(400).json(emailCadastrado);
    }

    const mentor = new CreateMentorService().createMentor(
      name,
      email,
      password,
      cpf,
      publicEmail,
      phone,
      chavePix
    );

    return res.status(200).json(mentor);
  }
}
