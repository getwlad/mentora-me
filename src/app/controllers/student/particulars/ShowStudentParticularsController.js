import Particulars from "../../../models/ParticularsModel";
class ShowStudentParticularsController {
  async show(req, res) {
    try {
      const { id } = req.params;
      const particulars = await Particulars.findOne({
        where: { student_id: id },
      });
      if (!particulars) {
        return res
          .status(401)
          .json({ error: "caracteristicas não cadastradas" });
      }
      return res.status(200).json(particulars);
    } catch (error) {
      return res.status(401).json({ error: error.message });
    }
  }
}

export default new ShowStudentParticularsController();
