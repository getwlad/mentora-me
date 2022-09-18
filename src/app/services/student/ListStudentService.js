import { Op } from "sequelize";
import Student from "../../models/StudentModel";
import InterestArea from "../../models/InterestAreaModel";
import { parseISO } from "date-fns";
class ListStudentService {
  async list(
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
  ) {
    if (name) {
      where = {
        ...where,
        name: {
          [Op.like]: name,
        },
      };
    }
    if (phone) {
      where = {
        ...where,
        phone: {
          [Op.like]: phone,
        },
      };
    }
    if (cpf) {
      where = {
        ...where,
        cpf: {
          [Op.like]: cpf,
        },
      };
    }
    if (points) {
      where = {
        ...where,
        points: {
          [Op.like]: points,
        },
      };
    }

    if (createdBefore) {
      where = {
        ...where,
        created_at: {
          [Op.gte]: parseISO(createdBefore),
        },
      };
    }

    if (createdAfter) {
      where = {
        ...where,
        created_at: {
          [Op.lte]: parseISO(createdAfter),
        },
      };
    }

    if (updatedBefore) {
      where = {
        ...where,
        updated_at: {
          [Op.gte]: parseISO(updatedBefore),
        },
      };
    }

    if (updatedAfter) {
      where = {
        ...where,
        updated_at: {
          [Op.lte]: parseISO(updatedAfter),
        },
      };
    }

    if (sort) {
      order = sort.split(",").map((item) => item.split(":"));
    }

    const data = await Student.findAll({
      where,
      include: [
        {
          model: InterestArea,
          as: "interests",
          through: {
            attributes: [],
          },
          attributes: ["mentoring_area"],
        },
      ],
      order,
      limit,
      offset: limit * page - limit,
    });

    return data;
  }
}

export default new ListStudentService();
