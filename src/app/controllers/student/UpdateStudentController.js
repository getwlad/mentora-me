import Student from "../../models/StudentModel";

class UpdateStudentController {
  async update(req, res) {
    const id = req.params.id;
    const { name, phone, cpf } = req.body;

    const student = await Student.findByPk(id);
    if (!student) {
      return res.status(404).json({ Error: "Estudante não encontrado" });
    }

    if (cpf) {
      if (student.cpf != cpf) {
        const studentcpf = await Student.findOne({
          where: { cpf: cpf },
        });
        if (studentcpf) {
          return res.status(400).json({ erro: "cpf já cadastrado" });
        }
      }
    }

    await student.update({ name, phone, cpf });
    return res.status(200).json(student);
  }
}

export default new UpdateStudentController();
