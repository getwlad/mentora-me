const studentData = require("../../../database/dbStudent.json");

export default class ListStudentService {
  listStudentsService() {
    return studentData;
  }
}
