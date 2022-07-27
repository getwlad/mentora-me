import createStudentService from "../../services/student/CreateStudentService.js";
import listStudentService from "../../services/student/ListStudentService.js";
import updateStudentService from "../../services/student/UpdateStudentService.js";
import deleteStudentService from "../../services/student/DeleteStudentService.js";
import showStudentService from "../../services/student/ShowStudentService.js";

const controller = {
  list: (request, response) => {
    const listStudents = listStudentService.listStudentsService();
    response.status(200).json(listStudents);
  },

  show: (request, response) => {
    const { id } = request.params;

    const student = showStudentService.showStudentData(id);

    return response.status(200).json(student);
  },

  create: (request, response) => {
    const { name, email, password, cpf, phone } = request.body;

    const cpfCadastrado = listStudentService
      .listStudentsService()
      .find((mentor) => mentor.cpf === cpf);
    const emailCadastrado = listStudentService
      .listStudentsService()
      .find((mentor) => mentor.email === email);
    if (cpfCadastrado) {
      return response.status(400).json({ Erro: "CPF Já Cadastrado" });
    }
    if (emailCadastrado) {
      return response.status(400).json({ Erro: "Email Já Cadastrado" });
    }

    const student = createStudentService.createStudent(
      name,
      email,
      password,
      cpf,
      phone
    );

    return response.status(200).json(student);
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

    response.status(200).json(updatedStudent);
  },

  delete: (request, response) => {
    const { id } = request.params;

    const resultado = deleteStudentService.delete(id);

    response.send(resultado);
  },
};

export default controller;
