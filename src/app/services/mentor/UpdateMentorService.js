import ListMentorService from '../service/ListMentorService';

const updateMentorService = {
    update: (
        id, 
        name,
        email,
        password,
        cpf,
        phone
    ) => {
        const mentor = ListMentorService.listMentorService();
        const mentorIndice = mentor.findIndex(item => item.id === id);

        if (mentorIndice === -1) {
            return { erro: "Mentor não encontrado"}
        }

        mentor[mentorIndice] = {
            id,
            name,
            email,
            password,
            cpf,
            phone
        }

        return mentor[mentorIndice]
        }
    }

export default updateMentorService;