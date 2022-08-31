import Mentor from "../../models/MentorModel";

class CreateMentorService {
  async createMentor(name, phone, chavePix, publicEmail, cnpj, userId) {
    const mentor = await Mentor.create({
      name,
      phone,
      chavePix,
      publicEmail,
      cnpj,
      user_id: userId,
    });

    return mentor;
  }
}

export default new CreateMentorService();
