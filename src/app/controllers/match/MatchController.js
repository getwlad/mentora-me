import Particulars from "../../models/ParticularsModel";
import { Op } from "sequelize";
import Mentor from "../../models/MentorModel";
import Mentorship from "../../models/MentorshipModel";

import InterestArea from "../../models/InterestAreaModel";
import Student from "../../models/StudentModel";
class MatchController {
  async match(req, res) {
    try {
      const userId = req.user;
      //Obtém todos interesses do estudante
      const student = await Student.findOne({
        where: {
          user_id: userId,
        },
        include: {
          model: InterestArea,
          as: "interests",
        },
      });
      const { id, interests } = student;

      if (!interests.length > 0) {
        return res.status(400).json({
          error: "Para um match ideal, registre seus interesses",
        });
      }
      //pega só os ids dos interesses do estudante
      const interestsIds = interests.map((interest) => {
        return interest.id;
      });
      //Obtém todos os mentores cujo tem a mesma area de mentoria
      const mentors = await Mentor.findAll({
        where: {
          interest_area_id: {
            [Op.or]: [interestsIds],
          },
        },
        include: [
          {
            model: Mentorship,
            attributes: ["id", "name", "price"],
          },
        ],
      });
      //obtém só ods ids dos mentores
      const mentorIds = mentors.map((mentor) => {
        return mentor.id;
      });

      //Obtém todas particularidades do estudante
      const particulars = await Particulars.findOne({
        where: { student_id: id },
      });
      if (!particulars) {
        return res.status(400).json({
          error: "Para um match ideal, registre suas preferências",
        });
      }

      //Obtem todas particularidades dos mentores
      const mentorsParticulars = await Particulars.findAll({
        where: { mentor_id: { [Op.or]: [mentorIds] } },
      });

      //match com base nas particularidades dos  mentores adequados
      //pega a lista de particularidade e as classifica com base na compatibilidade de mentor x mentorado
      const scoreMatch = await this.setScoreMatch(
        mentorsParticulars,
        particulars
      );
      //Ordena a a ordem de particularidades, da maior pontuação pra menor
      const ordMatch = await this.ordMatch(scoreMatch);
      //pega o array dos mentores ordenados
      const mentorsLimit = 5;
      const bestMatch = await this.ordMentores(mentors, ordMatch, mentorsLimit);

      if (!bestMatch) {
        return res
          .status(200)
          .json({ message: "Ainda não temos um match adequado :/" });
      }

      return res.status(200).json(bestMatch);
    } catch (error) {
      return res
        .status(401)
        .json({ error: "Acesso não autorizado: login necessário." });
    }
  }
  async ordMentores(mentors, ordMatch, mentorsLimit) {
    const nArray = [];
    ordMatch.forEach((particulars, i) => {
      nArray.push(
        mentors.find((mentor) => mentor.id === particulars.mentor_id)
      );
    });

    if (nArray.length === 0) {
      return null;
    }

    return nArray.slice(0, mentorsLimit);
  }
  async ordMatch(mentorsParticulars) {
    return mentorsParticulars.sort((a, b) => {
      if (a.score > b.score) {
        return -1;
      }
    });
  }
  async setScoreMatch(mentorsParticulars, particulars) {
    return mentorsParticulars.map((mentorParticulars) => {
      let score = 0;

      if (mentorParticulars.extrovert === particulars.extrovert) {
        score += 3;
      }
      if (mentorParticulars.extrovert < particulars.extrovert) {
        score += 2;
      }
      if (mentorParticulars.extrovert > particulars.extrovert) {
        score += 1;
      }
      if (mentorParticulars.theory === particulars.theory) {
        score += 3;
      }
      if (mentorParticulars.theory < particulars.theory) {
        score += 2;
      }
      if (mentorParticulars.theory > particulars.theory) {
        score += 1;
      }
      if (mentorParticulars.practice === particulars.practice) {
        score += 3;
      }
      if (mentorParticulars.practice < particulars.practice) {
        score += 2;
      }
      if (mentorParticulars.practice > particulars.practice) {
        score += 1;
      }
      if (
        mentorParticulars.mentoring_in_group === particulars.mentoring_in_group
      ) {
        score += 3;
      }
      if (
        mentorParticulars.mentoring_in_group < particulars.mentoring_in_group
      ) {
        score += 2;
      }
      if (
        mentorParticulars.mentoring_in_group > particulars.mentoring_in_group
      ) {
        score += 1;
      }
      if (
        mentorParticulars.mentoring_individual ===
        particulars.mentoring_individual
      ) {
        score += 3;
      }
      if (
        mentorParticulars.mentoring_individual <
        particulars.mentoring_individual
      ) {
        score += 2;
      }
      if (
        mentorParticulars.mentoring_individual >
        particulars.mentoring_individual
      ) {
        score += 1;
      }
      if (mentorParticulars.libras === particulars.libras) {
        score += 3;
      }
      if (mentorParticulars.libras < particulars.libras) {
        score += 2;
      }
      if (mentorParticulars.libras > particulars.libras) {
        score += 1;
      }
      if (mentorParticulars.minority_groups === particulars.minority_groups) {
        score += 3;
      }
      if (mentorParticulars.minority_groups < particulars.minority_groups) {
        score += 2;
      }
      if (mentorParticulars.minority_groups > particulars.minority_groups) {
        score += 1;
      }
      mentorParticulars.score = score;
      return mentorParticulars;
    });
  }
}

export default new MatchController();
