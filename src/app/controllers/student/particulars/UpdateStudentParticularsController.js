import Particulars from "../../../models/ParticularsModel";
class UpdateStudentParticularsController {
  async update(req, res) {
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
      const particulars = await Particulars.findOne({
        where: {
          student_id: id,
        },
      });
      if (!particulars) {
        return res.status(401).json({
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
