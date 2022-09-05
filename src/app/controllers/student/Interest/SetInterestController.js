import Student from "../../../models/StudentModel";
class SetInterestController {
  async set(req, res) {
    try {
      const { id } = req.body;
      const student = await Student.findByPk(id);
      student.addInterest(1);
      return res.status(200).json(student);
    } catch (error) {
      return res.status(401).json({ error: error.message });
    }
  }
}

export default new SetInterestController();
