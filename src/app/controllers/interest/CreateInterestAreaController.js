import InterestArea from "../../models/InterestAreaModel";

class CreateInterestArea {
  async create(req, res) {
    try {
      const { mentoringArea } = req.body;
      const area = await InterestArea.create({ mentoring_area: mentoringArea });
      return res.status(200).json(area);
    } catch (error) {
      return res.status(401).json({ error: error.message });
    }
  }
}

export default new CreateInterestArea();
