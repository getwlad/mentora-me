import UpdateStudentService from "../../services/student/UpdateStudentService";
import CheckStudentEmailCpf from "../../services/student/CheckStudentEmailCpf";

export default class UpdateStudentController {
  constructor() {}
  update(req, res) {
    const { id } = req.params;
    const { name, email, password, cpf, phone } = req.body;

    const cpfCadastrado = CheckStudentEmailCpf.checkCPF(cpf);
    const emailCadastrado = CheckStudentEmailCpf.checkEmail(email);
    if (cpfCadastrado) {
      return res.status(400).json(cpfCadastrado);
    }
    if (emailCadastrado) {
      return res.status(400).json(emailCadastrado);
    }

    const updatedStudent = new UpdateStudentService().update(id, name, email, password, cpf, phone);

    res.status(200).json(updatedStudent);
  }
}
