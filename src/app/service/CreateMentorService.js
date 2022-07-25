const {  v4  } = require('uuid')

const CreateMentorService = {
    create: (nome, email, telefone, cpf) => { 
    if (telefone < 10) {
        const createdMetor = {
            sucess: false,
            message: "Número de telefone inválido"
        }

        return createdMetor
    }

    if(email.search("@") ==-1) {
        return {
            sucess: false,
            message: "E-mail inválido"
        }
    }

    if(cpf < 11) {
        return {
            sucess: false,
            message: "CPF inválido"
        }
    }

    const newMentor = new MentorModel(v4(), nome, email, telefone, cpf)

    return {
        sucess: true,
        message: newMentor
    }
  }

}

module.exports = CreateMentorService