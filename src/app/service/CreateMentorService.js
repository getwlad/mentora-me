import MentorModel from '../models/MentorModel';

import { v4 } from "uuid";

const createMentorService = {
    create: (name, email, password, cpf, phone) => { 
        const newMentor = new MentorModel(
            v4(),
            name,
            email,
            password,
            cpf,
            phone
        )
    
    return newMentor
    }
  }

export default createMentorService;