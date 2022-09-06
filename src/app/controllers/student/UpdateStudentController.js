import Student from "../../models/StudentModel";

class UpdateStudentController {
  async update(req, res) {
    try {
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
    } catch (error) {
      return res.status(401).json({ error: error.message });
    }
  }
}

export default new UpdateStudentController();
