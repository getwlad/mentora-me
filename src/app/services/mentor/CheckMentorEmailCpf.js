import ListMentorService from "./ListMentorService";

class CheckEmailCpf {
  checkCPF(cpf) {
    const cpfCadastrado = new ListMentorService()
      .listMentorService()
      .find((mentor) => mentor.cpf === cpf);

    if (cpfCadastrado) {
      return { Erro: "CPF Já Cadastrado" };
    }
  }
  checkEmail(email) {
    const emailCadastrado = new ListMentorService()
      .listMentorService()
      .find((mentor) => mentor.email === email);

    if (emailCadastrado) {
      return { Erro: "Email Já Cadastrado" };
    }
  }
}

export default new CheckEmailCpf();
