import { Op } from "sequelize";
import InterestArea from "../../models/InterestAreaModel";
import Mentor from "../../models/MentorModel";
class ListMentorService {
  async list(
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
    if (chavePix) {
      where = {
        ...where,
        chavePix: {
          [Op.like]: chavePix,
        },
      };
    }
    if (publicEmail) {
      where = {
        ...where,
        publicEmail: {
          [Op.like]: publicEmail,
        },
      };
    }
    if (cnpj) {
      where = {
        ...where,
        cnpj: {
          [Op.like]: cnpj,
        },
      };
    }

    if (createdBefore) {
      where = {
        ...where,
        createdBefore: {
          [Op.gte]: parseISO(createdBefore),
        },
      };
    }

    if (createdAfter) {
      where = {
        ...where,
        createdAfter: {
          [Op.lte]: parseISO(createdAfter),
        },
      };
    }

    if (updatedBefore) {
      where = {
        ...where,
        updatedBefore: {
          [Op.gte]: parseISO(updatedBefore),
        },
      };
    }

    if (updatedAfter) {
      where = {
        ...where,
        updatedAfter: {
          [Op.lte]: parseISO(updatedAfter),
        },
      };
    }

    if (sort) {
      order = sort.split(",").map((item) => item.split(":"));
    }

    const data = await Mentor.findAll({
      where,
      order,
      limit,
      offset: limit * page - limit,
      attributes: {
        exclude: ["interest_area_id"],
      },
      include: {
        model: InterestArea,
        attributes: ["mentoring_area"],
      },
    });

    return data;
  }
}

export default new ListMentorService();
