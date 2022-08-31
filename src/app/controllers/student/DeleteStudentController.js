import Student from "../../models/StudentModel";
class DeleteStudentController {
  async delete(req, res) {
    const id = req.params.id;

    const student = await Student.findByPk(id);
    if (!student) {
      return res.status(404).json({ Error: "Estudante não encontrado" });
    }
    await student.destroy();
    return res.status(200).json({ msg: "sucesso" });
  }
}

export default new DeleteStudentController();
