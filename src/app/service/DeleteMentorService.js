const ListMentorService = require('../service/ListMentorService');

const DeleteMentorService = {
    delete: (id) => {
        const mentor = ListMentorService.listMentorService()
        const mentorIndice = mentor.findIndex(item => item.id === Number(id))

        if (mentorIndice === -1) {
            return { erro: "Mentor não encontrado" }
        }

        mentor.splice(mentorIndice, 1)

        return { mensagem: "O cadastro foi removido com sucesso" }
    }
}

module.exports = DeleteMentorService