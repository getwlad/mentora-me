import ListMentorService from "./ListMentorService";

const ShowMentorService = {
  showMentorData: (mentorId) => {
    const mentorShow = ListMentorService.listMentorService();
    const mentor = mentorShow.find((item) => item.id === mentorId);
    if (!mentor) {
      return { Erro: "Mentor não encontrado" };
    }
    return mentor;
  },
};

export default ShowMentorService;
