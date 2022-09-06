import Particulars from "../../../models/ParticularsModel";
class CreateStudentParticularsController {
  async create(req, res) {
    try {
      const { id } = req.params;
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
        mentoringInGroup,
        mentoringIndividual,
        libras,
        minorityGroups,
      });
      return res.status(200).json(particulars);
    } catch (error) {
      return res.status(401).json({ error: error.message });
    }
  }
}
export default new CreateStudentParticularsController();
