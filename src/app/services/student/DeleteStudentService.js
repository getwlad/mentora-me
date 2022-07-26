import ListStudentService from "./ListStudentService.js";

const DeleteStudentService = {
  delete: (id) => {
    const students = ListStudentService.listStudentsService();
    const studentIndex = students.findIndex((item) => item.id === id);

    if (studentIndex === -1) {
      return { erro: "Mentorado não encontrado" };
    }

    students.splice(studentIndex, 1);

    return { mensagem: "Mentorado removido com sucesso" };
  },
};

export default DeleteStudentService;
