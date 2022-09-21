import Particulars from "../../../models/ParticularsModel";
import Student from "../../../models/StudentModel";
class CreateStudentParticularsController {
  async create(req, res) {
    try {
      const userId = req.user;

      const student = await Student.findOne({
        where: {
          user_id: userId,
        },
      });
      if (!student) {
        return res.status(404).json({ error: "Estudante não cadastrado" });
      }
      const { id } = student;
      const {
        extrovert,
        theory,
        practice,
        mentoringInGroup,
        mentoringIndividual,
        libras,
        minorityGroups,
      } = req.body;
      const particulars = await Particulars.create({
        student_id: id,
        extrovert,
        theory,
        practice,
        mentoring_in_group: mentoringInGroup,
        mentoring_individual: mentoringIndividual,
        libras,
        minority_groups: minorityGroups,
      });
      return res.status(201).json(particulars);
    } catch (error) {
      return res.status(401).json({ error: error.message });
    }
  }
}
export default new CreateStudentParticularsController();
