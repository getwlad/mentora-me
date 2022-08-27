import ListMentorService from "./ListMentorService.js";
const fs = require("fs");

export default class DeleteMentorService {
  delete(id) {
    const mentor = new ListMentorService().listMentorService();
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
    return { mensagem: "Mentor removido com sucesso" };
  }
}
