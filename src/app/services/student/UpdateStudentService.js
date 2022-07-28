import CheckStudentEmailCpf from "./CheckStudentEmailCpf.js";
import ListStudentService from "./ListStudentService.js";
const fs = require("fs");

const updateStudentService = {
  update: (id, name, email, password, cpf, phone) => {
    const students = ListStudentService.listStudentsService();
    const studentIndice = students.findIndex((item) => item.id === id);

    if (studentIndice === -1) {
      return { erro: "Mentorado não encontrado" };
    }

    const { cpf: oldCpf, email: oldEmail } = students[studentIndice];
    if (oldCpf !== cpf) {
      const res = CheckStudentEmailCpf.checkCPF(cpf);
      if (res) {
        return res;
      }
    }
    if (oldEmail !== email) {
      const res = CheckStudentEmailCpf.checkEmail(email);
      if (res) {
        return res;
      }
    }

    students[studentIndice] = {
      id,
      name,
      email,
      password,
      cpf,
      phone,
    };
    fs.writeFile(
      "./src/database/dbStudent.json",
      JSON.stringify(students),
      (err) => {
        if (err) throw err;
      }
    );
    return students[studentIndice];
  },
};

export default updateStudentService;
