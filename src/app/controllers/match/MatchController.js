import Student from "../../models/StudentModel";

class MatchController {
  async list(req, res) {
    try {
      const { idStudent } = req.body;
      const student = await Student.findByPk(idStudent);
    } catch (error) {
      return res.status(401).json({ error });
    }
  }
}

export default new MatchController();
