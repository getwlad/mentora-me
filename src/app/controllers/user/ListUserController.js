import ListUserService from "../../services/user/ListUserService";
class ListUserController {
  async list(req, res) {
    const {
      email,
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
    const data = await ListUserService.list(
      email,
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

export default new ListUserController();
