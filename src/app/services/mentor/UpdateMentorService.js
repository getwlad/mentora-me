import ListMentorService from "./ListMentorService.js";
const fs = require("fs");

const updateMentorService = {
  update: (id, name, email, password, cpf, publicEmail, phone, chavePix) => {
    const mentor = ListMentorService.listMentorService();
    const mentorIndice = mentor.findIndex((item) => item.id === id);

    if (mentorIndice === -1) {
      return { erro: "Mentor não encontrado" };
    }

    mentor[mentorIndice] = {
      id,
      name,
      email,
      password,
      cpf,
      publicEmail,
      phone,
      chavePix,
    };
    fs.writeFile(
      "./src/database/dbMentor.json",
      JSON.stringify(mentor),
      (err) => {
        if (err) throw err;
      }
    );
    return mentor[mentorIndice];
  },
};

export default updateMentorService;
