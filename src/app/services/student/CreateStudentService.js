import StudentModel from "../../models/student/StudentModel.js";
import { v4 } from "uuid";

const createStudentService = {
  createStudent: (name, email, password, cpf, phone) => {
    const newStudent = new StudentModel(
      v4(),
      name,
      email,
      password,
      cpf,
      phone
    );

    return newStudent;
  },
};

export default createStudentService;
