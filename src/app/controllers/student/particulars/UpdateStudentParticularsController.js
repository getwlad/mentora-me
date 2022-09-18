import Particulars from "../../../models/ParticularsModel";
import Student from "../../../models/StudentModel";
class UpdateStudentParticularsController {
  async update(req, res) {
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
      const particulars = await Particulars.findOne({
        where: {
          student_id: id,
        },
      });
      if (!particulars) {
        return res.status(404).json({
          error: "caracteristicas não cadastradas",
        });
      }
      await particulars.update({
        extrovert,
        theory,
        practice,
        mentoring_in_group: mentoringInGroup,
        mentoring_individual: mentoringIndividual,
        libras,
        minority_groups: minorityGroups,
      });
      return res.status(200).json(particulars);
    } catch (error) {
      return res.status(401).json({ error: error.message });
    }
  }
}
export default new UpdateStudentParticularsController();
