import ListStudentService from "./ListStudentService.js";

const updateStudentService = {
  update: (id, name, email, password, cpf, phone) => {
    const students = ListStudentService.listStudentsService();
    const studentIndice = students.findIndex((item) => item.id === id);

    if (studentIndice === -1) {
      return { erro: "Mentorado não encontrado" };
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
