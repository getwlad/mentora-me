import Student from "../../../models/StudentModel";
import ListInterestService from "../../../services/interest/ListInterestService";
class AddInterestController {
  async add(req, res) {
    try {
      const { id } = req.params;
      const student = await Student.findByPk(id);
      const { mentoringArea } = req.body;

      const areas = await ListInterestService.list();
      let interestArea;

      //Percorre o array de areas de mentoria e se encontrar uma igual a adicionada ele adiciona ao estudante
      areas.map((area) => {
        if (area.mentoring_area === mentoringArea) {
          student.addInterest(area.id);
          interestArea = area.mentoring_area;
        }
      });
      if (!interestArea) {
        return res
          .status(401)
          .json({ error: "Area de Mentoria não encontrada" });
      }

      return res.status(200).json({ mentoringArea: interestArea });
    } catch (error) {
      return res.status(401).json({ error: error.message });
    }
  }
}

export default new AddInterestController();
