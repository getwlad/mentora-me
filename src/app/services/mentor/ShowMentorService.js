import ListMentorService from "./ListMentorService";

export default class ShowMentorService {
  showMentorData(mentorId) {
    const mentorShow = new ListMentorService().listMentorService();
    const mentor = mentorShow.find((item) => item.id === mentorId);
    if (!mentor) {
      return { Erro: "Mentor não encontrado" };
    }
    return mentor;
  }
}
