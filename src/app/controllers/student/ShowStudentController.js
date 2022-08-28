import Student from "../../models/StudentModel";

class ShowStudentController {
  async show(req, res) {
    const id = req.params.id;
    const student = await Student.findByPk(id);
    if (!student) {
      return res.status(404).json({ Error: "Estudante não encontrado" });
    }
    return res.status(200).json(student);
  }
}

export default new ShowStudentController();
