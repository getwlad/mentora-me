import Mentorship from "../../../models/MentorshipModel";
import ListInterestService from "../../../services/interest/ListInterestService";
class CreateMentorshipController {
  async create(req, res) {
    try {
      const { id } = req.params;
      const { name, price } = req.body;
      let { mentoringArea } = req.body;
      mentoringArea = mentoringArea.toUpperCase();

      const areas = await ListInterestService.list();
      let interestArea;
      areas.map((area) => {
        if (area.mentoring_area === mentoringArea) {
          interestArea = area.mentoring_area;
        }
      });

      if (!interestArea) {
        return res
          .status(401)
          .json({ error: "Area de Mentoria não encontrada" });
      }

      const mentorship = await Mentorship.create({
        name,
        mentoring_area: interestArea,
        price,
        mentor_id: id,
      });

      return res.status(200).json(mentorship);
    } catch (error) {
      return res.status(401).json({ error: error.message });
    }
  }
}

export default new CreateMentorshipController();
