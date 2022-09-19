import InterestArea from "../../models/InterestAreaModel";
import Student from "../../models/StudentModel";

class ShowStudentController {
  async show(req, res) {
    try {
      const userId = req.user;

      const student = await Student.findOne({
        where: {
          user_id: userId,
        },

        include: {
          model: InterestArea,
          as: "interests",
          attributes: ["mentoring_area"],
        },
      });

      if (!student) {
        return res.status(404).json({ error: "Estudante não encontrado(a)." });
      }
      return res.status(200).json(student);
    } catch (error) {
      return res
        .status(401)
        .json({ error: "Acesso não autorizado: login necessário." });
    }
  }
}

export default new ShowStudentController();
