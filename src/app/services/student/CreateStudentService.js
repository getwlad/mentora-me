import StudentModel from "../../models/student/StudentModel.js";
import { v4 } from "uuid";
const studentData = require("../../../database/dbStudent.json");
const fs = require("fs");

export default class createStudentService {
  createStudent(name, email, password, cpf, phone) {
    const newStudent = new StudentModel(
      v4(),
      name,
      email,
      password,
      cpf,
      phone
    );
    studentData.push(newStudent);
    fs.writeFile(
      "./src/database/dbStudent.json",
      JSON.stringify(studentData),
      (err) => {
        if (err) throw err;
      }
    );
    return newStudent;
  }
}
