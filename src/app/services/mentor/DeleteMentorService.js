import ListMentorService from '../service/ListMentorService';

const DeleteMentorService = {
    delete: (id) => {
        const mentor = ListMentorService.listMentorService();
        const mentorIndex = mentor.findIndex(item => item.id === Number(id));

        if (mentorIndex === -1) {
            return { erro: "Mentor não encontrado" }
        }

        mentor.splice(mentorIndex, 1);

        return { mensagem: "O cadastro do mentor foi removido com sucesso" };
    }
}

export default DeleteMentorService;

