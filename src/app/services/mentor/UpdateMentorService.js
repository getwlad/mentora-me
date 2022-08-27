import ListMentorService from "./ListMentorService.js";
const fs = require("fs");
import CheckEmailCpf from "./CheckMentorEmailCpf.js";

export default class UpdateMentorService {
  update(id, name, email, password, cpf, publicEmail, phone, chavePix) {
    const mentor = new ListMentorService().listMentorService();
    const mentorIndice = mentor.findIndex((item) => item.id === id);

    if (mentorIndice === -1) {
      return { erro: "Mentor não encontrado" };
    }

    const { cpf: oldCpf, email: oldEmail } = mentor[mentorIndice];
    if (oldCpf !== cpf) {
      const res = CheckEmailCpf.checkCPF(cpf);
      if (res) {
        return res;
      }
    }
    if (oldEmail !== email) {
      const res = CheckEmailCpf.checkEmail(email);
      if (res) {
        return res;
      }
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
  }
}
