import { v4 as uuidv4 } from "uuid";
import {
  CreateCoursePayloadDto,
  UpdateCoursePayloadDto,
} from "../../common/dto";
import Courses from "../../database/models/Courses.model";
import { NotFoundError } from "../../errors";

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
    };
  },

  delete: async (courseId: string) => {
    const course = await Courses.findByPk(courseId);

    if (!course) {
      throw new NotFoundError("Your given edited course not found");
    }

    await Courses.destroy({ where: { id: courseId } });

    return {
      id: course.id,
    };
  },
};

export default CourseService;
