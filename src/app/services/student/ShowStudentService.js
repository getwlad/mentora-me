import ListStudentService from "./ListStudentService";

const ShowStudentService = {
  showStudentData: (studentId) => {
    const studentShow = ListStudentService.listStudentsService();
    const student = studentShow.find((item) => item.id === studentId);
    return student;
  },
};

export default ShowStudentService;
