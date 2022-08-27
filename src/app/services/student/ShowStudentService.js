import ListStudentService from "./ListStudentService";

export default class ShowStudentService {
  showStudentData(studentId) {
    const studentShow = new ListStudentService().listStudentsService();
    const student = studentShow.find((item) => item.id === studentId);
    if (!student) {
      return { Erro: "Mentorado não encontrado" };
    }
    return student;
  }
}
