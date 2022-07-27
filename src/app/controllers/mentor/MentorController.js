import createMentorService from "../../services/mentor/CreateMentorService.js";
import listMentorService from "../../services/mentor/ListMentorService.js";
import updateMentorService from "../../services/mentor/UpdateMentorService.js";
import deleteMentorService from "../../services/mentor/DeleteMentorService.js";
import showMentorService from "../../services/mentor/ShowMentorService.js";

const controller = {
  list: (request, response) => {
    const listMentor = listMentorService.listMentorService();
    response.json(listMentor);
  },

  show: (request, response) => {
    const { id } = request.params;

    const mentor = showMentorService.showMentorData(id);

    return response.json(mentor);
  },

  create: (request, response) => {
    const { name, email, password, cpf, phone, chavePix } = request.body;
    const mentor = createMentorService.createMentor(
      name,
      email,
      password,
      cpf,
      phone,
      chavePix
    );

    return response.json(mentor);
  },

  update: (request, response) => {
    const { id } = request.params;
    const { name, email, password, cpf, publicEmail, phone, chavePix } = request.body;

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

    response.json(updateMentor);
  },

  delete: (request, response) => {
    const { id } = request.params;

    const resultado = deleteMentorService.delete(id);

    response.send(resultado);
  },
};

export default controller;
