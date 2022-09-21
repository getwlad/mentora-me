import Student from "../../../models/StudentModel";
import ListInterestService from "../../../services/interest/ListInterestService";

class DeleteInterestController {
  async delete(req, res) {
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
      const { mentoringArea } = req.body;
      const areas = await ListInterestService.list();
      let interestArea;

      //Percorre o array de areas de mentoria e se encontrar uma igual a adicionada ele adiciona ao estudante
      for (let area of areas) {
        if (area.mentoring_area === mentoringArea) {
          await student.removeInterests(area.id);
          interestArea = area.mentoring_area;
        }
      }

      if (!interestArea) {
        return res
          .status(404)
          .json({ error: "Área de interesse não encontrada." });
      }
      return res
        .status(200)
        .json({ message: "Área de interesse deletada com sucesso!" });
    } catch (error) {
      return res.status(401).json({ error: error.message });
    }
  }
}

export default new DeleteInterestController();
