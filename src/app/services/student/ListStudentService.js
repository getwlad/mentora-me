import StudentModel from "../../models/student/StudentModel.js";

const ListStudentService = {
  listStudentsService: () => {
    const student = new StudentModel(
      "1",
      "ludmila",
      "exemplouaaaaa@gmail.com",
      "admin",
      0,
      5
    );

    const student2 = new StudentModel(
      "2",
      "mariana",
      "exemplouaaaaa@gmail.com",
      "admin",
      0,
      5
    );

    return [student, student2];
  },
};

export default ListStudentService;
