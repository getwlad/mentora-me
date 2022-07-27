const mentorData = require("../../../database/dbMentor.json");
const ListMentorService = {
  listMentorService: () => {
    return mentorData;
  },
};

export default ListMentorService;
