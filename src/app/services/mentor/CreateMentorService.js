import MentorModel from "../../models/mentor/MentorModel.js";
import { v4 } from "uuid";
const mentorData = require("../../../database/dbMentor.json");
const fs = require("fs");

const createMentorService = {
  createMentor: (name, email, password, cpf, publicEmail, phone, chavePix) => {
    const newMentor = new MentorModel(
      v4(),
      name,
      email,
      password,
      cpf,
      publicEmail,
      phone,
      chavePix
    );
    mentorData.push(newMentor);
    fs.writeFile(
      "./src/database/dbMentor.json",
      JSON.stringify(mentorData),
      (err) => {
        if (err) throw err;
      }
    );
    return newMentor;
  },
};

export default createMentorService;
