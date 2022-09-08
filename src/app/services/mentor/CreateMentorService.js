import Mentor from "../../models/MentorModel";

class CreateMentorService {
  async createMentor(
    name,
    phone,
    chavePix,
    publicEmail,
    cnpj,
    userId,
    interestAreaId
  ) {
    const mentor = await Mentor.create({
      name,
      phone,
      chavePix,
      publicEmail,
      cnpj,
      user_id: userId,
      interest_area_id: interestAreaId,
    });

    return mentor;
  }
}

export default new CreateMentorService();
