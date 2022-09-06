import Particulars from "../../models/ParticularsModel";
import { Op } from "sequelize";
import Mentor from "../../models/MentorModel";
import Mentorship from "../../models/MentorshipModel";
class MatchController {
  async match(req, res) {
    try {
      const { id } = req.params;
      const particulars = await Particulars.findOne({
        where: { student_id: id },
      });
      const mentorsParticulars = await Particulars.findAll({
        where: { mentor_id: { [Op.ne]: null } },
      });

      let bestMatch;
      let maxCount = 0;
      mentorsParticulars.forEach((mentorParticulars) => {
        let count = 0;
        if (mentorParticulars.extrovert === particulars.extrovert) {
          count += 3;
        }
        if (mentorParticulars.extrovert < particulars.extrovert) {
          count += 2;
        }
        if (mentorParticulars.extrovert > particulars.extrovert) {
          count += 1;
        }
        if (mentorParticulars.theory === particulars.theory) {
          count += 3;
        }
        if (mentorParticulars.theory < particulars.theory) {
          count += 2;
        }
        if (mentorParticulars.theory > particulars.theory) {
          count += 1;
        }
        if (mentorParticulars.practice === particulars.practice) {
          count += 3;
        }
        if (mentorParticulars.practice < particulars.practice) {
          count += 2;
        }
        if (mentorParticulars.practice > particulars.practice) {
          count += 1;
        }
        if (
          mentorParticulars.mentoring_in_group === particulars.mentoringInGroup
        ) {
          count += 3;
        }
        if (
          mentorParticulars.mentoring_in_group < particulars.mentoringInGroup
        ) {
          count += 2;
        }
        if (
          mentorParticulars.mentoring_in_group > particulars.mentoringInGroup
        ) {
          count += 1;
        }
        if (
          mentorParticulars.mentoring_individual ===
          particulars.mentoringIndividual
        ) {
          count += 3;
        }
        if (
          mentorParticulars.mentoring_individual <
          particulars.mentoringIndividual
        ) {
          count += 2;
        }
        if (
          mentorParticulars.mentoring_individual >
          particulars.mentoringIndividual
        ) {
          count += 1;
        }
        if (mentorParticulars.libras === particulars.libras) {
          count += 3;
        }
        if (mentorParticulars.libras < particulars.libras) {
          count += 2;
        }
        if (mentorParticulars.libras > particulars.libras) {
          count += 1;
        }
        if (mentorParticulars.minority_groups === particulars.minorityGroups) {
          count += 3;
        }
        if (mentorParticulars.minority_groups < particulars.minorityGroups) {
          count += 2;
        }
        if (mentorParticulars.minority_groups > particulars.minorityGroups) {
          count += 1;
        }
        if (count > maxCount) {
          maxCount = count;
          bestMatch = mentorParticulars.mentor_id;
        }
      });
      if (!bestMatch) {
        return res
          .status(200)
          .json({ message: "Ainda não temos um match adequado :/" });
      }
      const mentor = await Mentor.findOne({
        where: {
          id: bestMatch,
        },
        include: [
          {
            model: Mentorship,
            attributes: ["name", "mentoring_area", "price"],
          },
        ],
      });
      return res.status(200).json(mentor);
    } catch (error) {
      return res.status(401).json({ error });
    }
  }
}

export default new MatchController();
