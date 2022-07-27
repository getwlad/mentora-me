import createMentorService from "../../services/mentor/CreateMentorService.js";
import listMentorService from "../../services/mentor/ListMentorService.js";
import updateMentorService from "../../services/mentor/UpdateMentorService.js";
import deleteMentorService from "../../services/mentor/DeleteMentorService.js";
import showMentorService from "../../services/mentor/ShowMentorService.js";

const controller = {
  list: (request, response) => {
    const listMentor = listMentorService.listMentorService();
    response.status(200).json(listMentor);
  },

  show: (request, response) => {
    const { id } = request.params;

    const mentor = showMentorService.showMentorData(id);

    return response.status(200).json(mentor);
  },

  create: (request, response) => {
    const { name, email, password, cpf, publicEmail, phone, chavePix } =
      request.body;

    const cpfCadastrado = listMentorService
      .listMentorService()
      .find((mentor) => mentor.cpf === cpf);
    const emailCadastrado = listMentorService
      .listMentorService()
      .find((mentor) => mentor.email === email);
    if (cpfCadastrado) {
      return response.status(400).json({ Erro: "CPF Já Cadastrado" });
    }
    if (emailCadastrado) {
      return response.status(400).json({ Erro: "Email Já Cadastrado" });
    }

    const mentor = createMentorService.createMentor(
      name,
      email,
      password,
      cpf,
      publicEmail,
      phone,
      chavePix
    );

    return response.status(200).json(mentor);
  },

  update: (request, response) => {
    const { id } = request.params;
    const { name, email, password, cpf, publicEmail, phone, chavePix } =
      request.body;

    const updateMentor = updateMentorService.update(
      id,
      name,
      email,
      password,
      cpf,
      publicEmail,
      phone,
      chavePix
    );

    response.status(200).json(updateMentor);
  },

  delete: (request, response) => {
    const { id } = request.params;

    const resultado = deleteMentorService.delete(id);

    response.status(200).send(resultado);
  },
};

export default controller;
