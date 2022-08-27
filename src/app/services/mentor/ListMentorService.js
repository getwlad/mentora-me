const mentorData = require("../../../database/dbMentor.json");

export default class ListMentorService {
  listMentorService() {
    return mentorData;
  }
}
