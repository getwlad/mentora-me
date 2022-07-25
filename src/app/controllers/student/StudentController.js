import createStudentService from "../../services/student/CreateStudentService.js";
import listStudentService from "../../services/student/ListStudentService.js";
import updateStudentService from "../../services/student/UpdateStudentService.js";
import deleteStudentService from "../../services/student/DeleteStudentService.js";
import showStudentService from "../../services/student/ShowStudentService.js";

const controller = {
  list: (request, response) => {
    const listStudents = listStudentService.listStudentsService();
    response.json(listStudents);
  },

  show: (request, response) => {
    const { id } = request.params;

    const student = showStudentService.showStudentData(id);

    return response.json(student);
  },

  create: (request, response) => {
    const { name, email, password, cpf, phone } = request.body;

    const student = createStudentService.createStudent(
      name,
      email,
      password,
      cpf,
      phone
    );

    return response.json(student);
  },

  update: (request, response) => {
    const { id } = request.params;
    const { name, email, password, cpf, phone } = request.body;

    const updatedStudent = updateStudentService.update(
      id,
      name,
      email,
      password,
      cpf,
      phone
    );

    response.json(updatedStudent);
  },

  delete: (request, response) => {
    const { id } = request.params;

    const resultado = deleteStudentService.delete(id);

    response.send(resultado);
  },
};

export default controller;
