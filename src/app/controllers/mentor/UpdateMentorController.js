import UpdateMentorService from "../../services/mentor/UpdateMentorService";
import CheckEmailCpf from "../../services/mentor/CheckMentorEmailCpf";

export default class UpdateMentorController {
  update(req, res) {
    const { id } = req.params;
    const { name, email, password, cpf, publicEmail, phone, chavePix } = req.body;

    const cpfCadastrado = CheckEmailCpf.checkCPF(cpf);
    const emailCadastrado = CheckEmailCpf.checkEmail(email);
    if (cpfCadastrado) {
      return res.status(400).json(cpfCadastrado);
    }
    if (emailCadastrado) {
      return res.status(400).json(emailCadastrado);
    }

    const updateMentor = new UpdateMentorService().update(
      id,
      name,
      email,
      password,
      cpf,
      publicEmail,
      phone,
      chavePix
    );

    res.status(200).json(updateMentor);
  }
}
