import ListMentorService from "./ListMentorService.js";

const showMentorService = {
    showMentorData: (mentorId) => {
        const mentorShow = ListMentorService.listMentorService();
        const mentor = mentorShow.find(item => item.id === mentorId);
        return mentor
    }
}

export default showMentorService;