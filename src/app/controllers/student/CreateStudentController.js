import CreateStudentService from "../../services/student/CreateStudentService";
import Student from "../../models/StudentModel";
import User from "../../models/UserModel";

class CreateStudentController {
  constructor() {}
  async create(req, res) {
    const { name, cpf, phone } = req.body;
    const userId = req.params.user;
    const cpfCadastrado = await Student.findOne({ where: { cpf: cpf } });
    const userCadastrado = await Student.findOne({
      where: { user_id: userId },
    });
    const userExist = await User.findByPk(userId);

    if (!userExist) {
      return res.status(400).json({ error: "usuário não existe" });
    }

    if (cpfCadastrado) {
      return res.status(400).json({ error: "cpf já cadastrado" });
    }
    if (userCadastrado) {
      return res.status(400).json({ error: "usuário já cadastrado" });
    }

    const student = await CreateStudentService.createStudent(
      name,
      cpf,
      phone,
      userId
    );

    return res.status(200).json(student);
  }
}

export default new CreateStudentController();
