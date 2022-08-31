import ListMentorService from "../../services/mentor/ListMentorService";

class ListMentorController {
  async list(req, res) {
    const {
      name,
      phone,
      chavePix,
      publicEmail,
      cnpj,
      createdBefore,
      createdAfter,
      updatedBefore,
      updatedAfter,
      sort,
    } = req.query;

    const page = req.query.page || 1;
    const limit = req.query.limit || 25;
    let where = {};
    let order = [];
    const data = await ListMentorService.list(
      name,
      phone,
      chavePix,
      publicEmail,
      cnpj,
      createdBefore,
      createdAfter,
      updatedBefore,
      updatedAfter,
      sort,
      page,
      limit,
      where,
      order
    );

    return res.json(data);
  }
}

export default new ListMentorController();
