import ListStudentService from "./ListStudentService.js";
const fs = require("fs");

const DeleteStudentService = {
  delete: (id) => {
    const students = ListStudentService.listStudentsService();
    const studentIndex = students.findIndex((item) => item.id === id);

    if (studentIndex === -1) {
      return { erro: "Mentorado não encontrado" };
    }

    students.splice(studentIndex, 1);
    fs.writeFile(
      "./src/database/dbStudent.json",
      JSON.stringify(students),
      (err) => {
        if (err) throw err;
      }
    );
    return { mensagem: "Mentorado removido com sucesso" };
  },
};

export default DeleteStudentService;
