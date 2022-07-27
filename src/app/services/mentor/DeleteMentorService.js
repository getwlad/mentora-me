import ListMentorService from "./ListMentorService.js";
const fs = require("fs");

const DeleteMentorService = {
  delete: (id) => {
    const mentor = ListMentorService.listMentorService();
    const mentorIndex = mentor.findIndex((item) => item.id === id);

    if (mentorIndex === -1) {
      return { erro: "Mentorado não encontrado" };
    }

    mentor.splice(mentorIndex, 1);
    fs.writeFile(
      "./src/database/dbMentor.json",
      JSON.stringify(mentor),
      (err) => {
        if (err) throw err;
      }
    );
    return { mensagem: "Mentorado removido com sucesso" };
  },
};

export default DeleteMentorService;
