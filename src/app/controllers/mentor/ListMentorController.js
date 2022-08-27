import listMentorService from "../../services/mentor/ListMentorService";

export default class ListMentorController {
  constructor() {}
  list(req, res) {
    const listMentor = new listMentorService().listMentorService();
    res.status(200).json(listMentor);
  }
}
