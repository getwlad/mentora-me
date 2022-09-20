import InterestArea from "../../models/InterestAreaModel";

class DeleteInterestAreaController {
  async delete(req, res) {
    try {
      const { id } = req.params;
      const interestArea = await InterestArea.findOne({
        where: { id },
      });
      if (!interestArea) {
        return res
          .status(400)
          .json({ error: "Área de interesse não encontrada." });
      }

      await interestArea.destroy();
      return res
        .status(200)
        .json({ sucess: "Área de interesse deletada com sucesso!" });
    } catch (error) {
      return res.status(401).json({ error: error.message });
    }
  }
}

export default new DeleteInterestAreaController();
