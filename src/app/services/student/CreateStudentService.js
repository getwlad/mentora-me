import Student from "../../models/StudentModel.js";

const studentData = require("../../../database/dbStudent.json");

export default class createStudentService {
  async createStudent(name, email, cpf, phone, userId) {
    const newStudent = Student.create({
      name,
      email,
      cpf,
      phone,
      user_id: userId,
      points: 0,
    });

    return newStudent;
  }
}
