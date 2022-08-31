import Student from "../../models/StudentModel.js";

class CreateStudentService {
  async createStudent(name, cpf, phone, userId) {
    const student = await Student.create({
      name,
      cpf,
      phone,
      user_id: userId,
      points: 0,
    });

    return student;
  }
}

export default new CreateStudentService();
