import ShowStudentService from "../../services/student/ShowStudentService";

export default class ShowStudentController {
  constructor() {}
  show(req, res) {
    const { id } = req.params;

    const student = new ShowStudentService().showStudentData(id);

    return res.status(200).json(student);
  }
}
