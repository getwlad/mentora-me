import MentorModel from "../models/MentorModel";

const ListMentorService = {
    listMentorService: () => {
        const mentor = new MentorModel(
            1,
            "Isabel",
            "isabel@gmail.com",
            "admin",
            "00011122233",
            "00112233445"
        );

        const mentor2 = new MentorModel(
            2,
            "Bel",
            "bel@gmail.com",
            "admin",
            "00011122233",
            "00112233445"
        );
        
        return [mentor, mentor2]
    }
}

export default ListMentorService;