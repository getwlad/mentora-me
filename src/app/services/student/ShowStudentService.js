import ListStudentService from "./ListStudentService";

const ShowStudentService = {
  showStudentData: (studentId) => {
    const studentShow = ListStudentService.listStudentsService();
    const student = studentShow.find((item) => item.id === studentId);
    if (!student) {
      return { Erro: "Mentorado não encontrado" };
    }
    return student;
  },
};

export default ShowStudentService;
