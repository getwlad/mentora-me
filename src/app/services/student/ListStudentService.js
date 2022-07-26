import StudentModel from "../../models/student/StudentModel.js";
const studentData = require("../../../database/dbStudent.json");
const ListStudentService = {
  listStudentsService: () => {
    return studentData;
  },
};

export default ListStudentService;
