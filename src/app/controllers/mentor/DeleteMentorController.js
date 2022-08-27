import deleteMentorService from "../../services/mentor/DeleteMentorService";

export default class DeleteMentorController {
  constructor() {}
  delete(req, res) {
    const { id } = req.params;

    const resultado = new deleteMentorService().delete(id);

    res.status(200).send(resultado);
  }
}
