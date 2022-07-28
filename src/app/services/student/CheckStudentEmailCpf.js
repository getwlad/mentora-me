import ListStudentService from "./ListStudentService";

class CheckEmailCpf {
  checkCPF(cpf) {
    const cpfCadastrado = ListStudentService.listStudentsService().find(
      (mentor) => mentor.cpf === cpf
    );

    if (cpfCadastrado) {
      return { Erro: "CPF Já Cadastrado" };
    }
  }
  checkEmail(email) {
    const emailCadastrado = ListStudentService.listStudentsService().find(
      (mentor) => mentor.email === email
    );

    if (emailCadastrado) {
      return { Erro: "Email Já Cadastrado" };
    }
  }
}

export default new CheckEmailCpf();
