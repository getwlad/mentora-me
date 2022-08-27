import showMentorService from "../../services/mentor/ShowMentorService";

export default class ShowMentorController {
  constructor() {}
  show(req, res) {
    const { id } = req.params;

    const mentor = new showMentorService().showMentorData(id);

    return res.status(200).json(mentor);
  }
}
