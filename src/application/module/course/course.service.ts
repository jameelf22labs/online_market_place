import { v4 as uuidv4 } from "uuid";
import {
  CourseFilterParamDto,
  CreateCoursePayloadDto,
  UpdateCoursePayloadDto,
} from "../../common/dto";
import Courses from "../../database/models/Courses.model";
import { NotFoundError } from "../../errors";
import { Op } from "@sequelize/core";
import Instructor from "../../database/models/Instructor.model";
import Categories from "../../database/models/Categories.model";

const CourseService = {
  create: async (newCourse: CreateCoursePayloadDto) => {
    const createdCourse = await Courses.create({
      ...newCourse,
      price: newCourse.price,
      id: uuidv4(),
    });

    return {
      id: createdCourse.id,
      title: createdCourse.title,
      thumpnilUrl: createdCourse.thumbnilUrl,
    };
  },

  getByCourseId: (courseId: string) => {
    return Courses.findByPk(courseId);
  },

  getAllCourse: async (
    filter: Partial<CourseFilterParamDto>,
    page: number,
    limit: number
  ) => {
    const offset = (page - 1) * limit;

    const where: any = {};

    if (filter.minPrice) {
      where.price = { ...(where.price || {}), [Op.gte]: filter.minPrice };
    }

    if (filter.maxPrice) {
      where.price = { ...(where.price || {}), [Op.lte]: filter.maxPrice };
    }

    if (filter.title) {
      where.title = { [Op.like]: `%${filter.title}%` };
    }

    const result = await Courses.findAndCountAll({
      where,
      include: [
        {
          model: Instructor,
          required: !!filter.instructorId,
          where: filter.instructorId ? { id: filter.instructorId } : undefined,
        },
        {
          model: Categories,
          required: !!filter.categoryId,
          where: filter.categoryId ? { id: filter.categoryId } : undefined,
        },
      ],
      limit,
      offset,
    });

    return {
      data: result.rows,
      total: result.count,
      page,
      totalPages: Math.ceil(result.count / limit),
    };
  },

  update: async (
    courseId: string,
    updateCourse: Partial<UpdateCoursePayloadDto>
  ) => {
    const course = await Courses.findByPk(courseId);

    if (!course) {
      throw new NotFoundError("Your given edited course not found");
    }

    await Courses.update(updateCourse, {
      where: { id: courseId },
    });

    return {
      id: courseId,
      thumbnilUrl: updateCourse.thumbnilUrl || course.thumbnilUrl,
    };
  },

  delete: async (courseId: string) => {
    const course = await Courses.findByPk(courseId);

    if (!course) {
      throw new NotFoundError("Your given deleted course not found");
    }

    await Courses.destroy({ where: { id: courseId } });

    return {
      id: course.id,
    };
  },
};

export default CourseService;
