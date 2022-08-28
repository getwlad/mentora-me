import ListStudentService from "../../services/student/ListStudentService";

class ListStudentController {
  async list(req, res) {
    const {
      name,
      phone,
      cpf,
      points,
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
    const data = await ListStudentService.list(
      name,
      phone,
      cpf,
      points,
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

export default new ListStudentController();
