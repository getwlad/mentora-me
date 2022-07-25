const ListMentorService = require('../service/ListMentorService');
const CreateMentorService = require('../service/CreateMentorService');
const UpdateMentorService = require('../service/UpdateMentorService');
const DeleteMentorService = require('../service/DeleteMentorService');

const controller = {

    index: (request, response) => {
        const listMentor = ListMentorService.listMentorService()
        response.json(listMentor)
    },

    ListData: (request, response) => {
        const { nome } = request.query;

        if (!nome) {
            return response.status(400).json({ "error": "É necessário passar o nome do mentor"})
        } 

        const mentor = ListMentorService.listMentorData(nome);

        return response.json(mentor)
    },

    listAll: (request, response) => {
        const mentor = ListMentorService.listAll()

        return response.send(mentor)
    },


    create: (request, response) => {
        const {
            nome,
            email,
            telefone,
            cpf
        } = request.body;

        const mentor = CreateMentorService.createMentor(
            nome,
            email,
            telefone,
            cpf
        );

        return response.json(mentor)
    },

    update: (request, response) => {
        const { id } = request.params
        const {
            nome,
            email,
            telefone,
            cpf
        } = request.body;

        const updatedMentor = UpdateMentorService.update(
            id, 
            nome,
            email,
            telefone,
            cpf
        )

        response.json(updatedMentor)
    },

    delete: (request, response) => {
        const { id } = request.params

        const resultado = DeleteMentorService.delete(id)

        response.send(resultado)
    }
}

module.exports = controller;