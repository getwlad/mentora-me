const ListMentorService = require('../service/ListMentorService');

const UpdateMentorService = {
    update: (
        id, 
        nome,
        email,
        telefone,
        cpf
    ) => {
        const mentor = ListMentorService.listMentorService()
        const mentorIndice = mentor.findIndex(item => item.id === Number(id))

        if (mentorIndice === -1) {
            return { erro: "Cadastro não encontrado"}
        }

        mentor[mentorIndice] = {
            nome,
            email,
            telefone,
            cpf
        }

        return {
            id,
            ...mentor[mentorIndice]
        }
    }

}

module.exports = UpdateMentorService