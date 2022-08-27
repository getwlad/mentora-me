import ListStudentService from "../../services/student/ListStudentService";

export default class ListStudentController {
  constructor() {}
  list(req, res) {
    const listStudents = new ListStudentService().listStudentsService();
    res.status(200).json(listStudents);
  }
}
