import CreateStudentService from "../../services/student/CreateStudentService";
import CheckStudentEmailCpf from "../../services/student/CheckStudentEmailCpf";

export default class CreateStudentController {
  constructor() {}
  create(req, res) {
    const { name, email, password, cpf, phone } = req.body;

    const cpfCadastrado = CheckStudentEmailCpf.checkCPF(cpf);
    const emailCadastrado = CheckStudentEmailCpf.checkEmail(email);
    if (cpfCadastrado) {
      return res.status(400).json(cpfCadastrado);
    }
    if (emailCadastrado) {
      return res.status(400).json(emailCadastrado);
    }

    const student = new CreateStudentService().createStudent(
      name,
      email,
      password,
      cpf,
      phone
    );

    return res.status(200).json(student);
  }
}
