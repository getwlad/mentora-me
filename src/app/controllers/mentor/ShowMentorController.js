import InterestArea from "../../models/InterestAreaModel";
import Mentor from "../../models/MentorModel";

class ShowMentorController {
  async show(req, res) {
    try {
      const id = req.params.id;
      const mentor = await Mentor.findOne({
        where: {
          id,
        },
        attributes: {
          exclude: ["interest_area_id"],
        },
        include: {
          model: InterestArea,
          attributes: ["mentoring_area"],
        },
      });
      if (!mentor) {
        return res.status(404).json({ Error: "Mentor não encontrado" });
      }
      return res.status(200).json(mentor);
    } catch (error) {
      return res.status(401).json({ error: error.message });
    }
  }
}

export default new ShowMentorController();
