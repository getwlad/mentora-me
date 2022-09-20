import ListUserService from "../../services/user/ListUserService";
class ListUserController {
  async list(req, res) {
    try {
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
    } catch (error) {
      return res.status(401).json({ error: error.message });
    }
  }
}

export default new ListUserController();
