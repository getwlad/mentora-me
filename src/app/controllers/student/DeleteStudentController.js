import Student from "../../models/StudentModel";
class DeleteStudentController {
  async delete(req, res) {
    try {
      const id = req.params.id;

      const student = await Student.findByPk(id);
      if (!student) {
        return res.status(404).json({ Error: "Estudante não encontrado" });
      }
      await student.destroy();
      return res.status(200).json({ msg: "sucesso" });
    } catch (error) {
      return res.status(401).json({ error: error.message });
    }
  }
}

export default new DeleteStudentController();
