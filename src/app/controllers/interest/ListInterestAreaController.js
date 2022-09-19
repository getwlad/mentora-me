import ListInterestService from "../../services/interest/ListInterestService";

class ListInterestAreaController {
  async list(req, res) {
    try {
      const areas = await ListInterestService.list();
      return res.status(200).json(areas);
    } catch (error) {
      return res
        .status(401)
        .json({ error: "Acesso não autorizado: login necessário." });
    }
  }
}

export default new ListInterestAreaController();
