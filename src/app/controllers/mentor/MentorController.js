import ListMentorService from '../service/ListMentorService';
import CreateMentorService from '../../service/mentor/CreateMentorService';
import UpdateMentorService from '../../service/mentor/UpdateMentorService';
import DeleteMentorService from '../service/DeleteMentorService';

const controller = {

    list: (request, response) => {
        const listMentor = ListMentorService.listMentorService()
        response.json(listMentor)
    },

    show: (request, response) => {
        const { id } = request.params;

        const mentor = ShowMentorService.showMentorData(id);

        return response.json(mentor)

    },

    create: (request, response) => {
        const {
            name,
            email,
            password,
            cpf,
            phone
        } = request.body;

        const mentor = CreateMentorService.createMentor(
            name,
            email,
            password,
            cpf,
            phone
        );

        return response.json(mentor)
    },

    update: (request, response) => {
        const { id } = request.params
        const {
            name,
            email,
            password,
            cpf,
            phone
        } = request.body;

        const updatedMentor = UpdateMentorService.update(
            id, 
            name,
            email,
            password,
            cpf,
            phone
        );

        response.json(updatedMentor)
    },

    delete: (request, response) => {
        const { id } = request.params;

        const resultado = DeleteMentorService.delete(id)

        response.send(resultado)
    }
}

export default controller;