import InterestArea from "../../models/InterestAreaModel";
class ListInterestService {
  async list() {
    const areas = await InterestArea.findAll();
    return areas;
  }
}

export default new ListInterestService();
