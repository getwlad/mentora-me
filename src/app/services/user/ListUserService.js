import { Op } from "sequelize";
import { parseISO } from "date-fns";
import User from "../../models/UserModel";
class ListUserService {
  async list(
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
  ) {
    if (email) {
      where = {
        ...where,
        email: {
          [Op.like]: email,
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
    try {
      const data = await User.findAll({
        attributes: { exclude: ["password_hash"] },
        where,
        order,
        limit,
        offset: limit * page - limit,
      });

      return data;
    } catch (err) {
      return { erro: err.message };
    }
  }
}

export default new ListUserService();
