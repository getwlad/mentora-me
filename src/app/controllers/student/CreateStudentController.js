import CreateStudentService from "../../services/student/CreateStudentService";
import Student from "../../models/StudentModel";
import User from "../../models/UserModel";

class CreateStudentController {
  constructor() {}
  async create(req, res) {
    try {
      const { name, cpf, phone } = req.body;
      const userId = req.user;
      const cpfCadastrado = await Student.findOne({ where: { cpf: cpf } });
      const userCadastrado = await Student.findOne({
        where: { user_id: userId },
      });
      const userExist = await User.findByPk(userId);

      if (userExist.user_type !== "STUDENT") {
        return res.status(401).json({ error: "Tipo de usuário incorreto" });
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

      return res.status(201).json(student);
    } catch (error) {
      return res.status(401).json({ error: error.message });
    }
  }
}

export default new CreateStudentController();
