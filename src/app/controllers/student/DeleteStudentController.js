import Student from "../../models/StudentModel";
class DeleteStudentController {
  async delete(req, res) {
    try {
      const userId = req.user;

      const student = await Student.findOne({
        where: {
          user_id: userId,
        },
      });
      if (!student) {
        return res.status(404).json({ error: "Estudante não encontrado(a)." });
      }
      await student.destroy();
      return res
        .status(200)
        .json({ msg: "Estudante deletado(a) com sucesso!" });
    } catch (error) {
      return res.status(401).json({ error: error.message });
    }
  }
}

export default new DeleteStudentController();
