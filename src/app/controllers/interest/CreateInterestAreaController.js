import InterestArea from "../../models/InterestAreaModel";

class CreateInterestArea {
  async create(req, res) {
    try {
      const { mentoringArea } = req.body;
      const areaCadastrada = await InterestArea.findOne({
        where: { mentoring_area: mentoringArea },
      });

      if (areaCadastrada) {
        return res
          .status(400)
          .json({ error: "Área de interesse já cadastrada." });
      }

      const area = await InterestArea.create({ mentoring_area: mentoringArea });
      return res.status(200).json(area);
    } catch (error) {
      return res.status(401).json({ error: error.message });
    }
  }
}

export default new CreateInterestArea();
