const MentorModel = require('../models/MentorModel');

const ListMentorService = {
    listMentorService: () => {
        const mentor = new MentorModel(
            1,
            'Isabel',
            'isabel@gmail.com',
            '00011122233',
        )
        
        return [mentor]
    },

    listMentorData: (mentorNome) => {
        const mentorList = ListMentorService.listMentorService();
        const mentor = mentorList.find(item => item.nome === mentorNome);
        return mentor

    }
}

module.exports = ListMentorService