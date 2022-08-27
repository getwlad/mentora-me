import DeleteStudentService from "../../services/student/DeleteStudentService";

export default class DeleteStudentController {
  constructor() {}
  delete(req, res) {
    const { id } = req.params;

    const resultado = new DeleteStudentService().delete(id);

    res.send(resultado);
  }
}
