import Particulars from "../../../models/ParticularsModel";
import Student from "../../../models/StudentModel";
class ShowStudentParticularsController {
  async show(req, res) {
    try {
      const userId = req.user;
      const student = await Student.findOne({
        where: {
          user_id: userId,
        },
      });
      if (!student) {
        return res.status(404).json({ error: "Estudante não cadastrado(a)." });
      }
      const { id } = student;
      const particulars = await Particulars.findOne({
        where: { student_id: id },
      });
      if (!particulars) {
        return res
          .status(404)
          .json({ error: "Características não cadastradas." });
      }
      return res.status(200).json(particulars);
    } catch (error) {
      return res
        .status(401)
        .json({ error: "Acesso não autorizado: login necessário." });
    }
  }
}

export default new ShowStudentParticularsController();
