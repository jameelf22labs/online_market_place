import { NextFunction, Response } from "express";
import { AuthenticatedRequest } from "../../common/interface/AuthenticateRequest";
import CourseService from "./course.service";
import { CreateCourseSchema, UpdateCourseSchema } from "./course.validator";
import { BadRequestError } from "../../errors";
import {
  CourseFilterParamDto,
  CreateCoursePayloadDto,
  UpdateCoursePayloadDto,
} from "../../common/dto";
import ApiResponse from "../../common/utils/ApiSucessResponse";

const CourseHandler = {
  create: async (
    request: AuthenticatedRequest,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const validateCourse = await CreateCourseSchema.validateAsync(
        request.body
      );

      if (validateCourse?.error) {
        throw new BadRequestError(validateCourse?.error);
      }

      const createdCourse = await CourseService.create({
        ...request.body,
        thumbnilUrl: request.file?.filename,
        instructorId: request.user?.id,
      } as CreateCoursePayloadDto);

      return new ApiResponse(response)
        .setStatus(true)
        .setMessage("Course Successfully Created")
        .setData(createdCourse)
        .send(201);
    } catch (error) {
      next(error);
    }
  },

  getByCourseId: async (
    request: AuthenticatedRequest,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const { courseId } = request.params as { courseId: string };
      const course = await CourseService.getByCourseId(courseId);
      return new ApiResponse(response)
        .setStatus(true)
        .setMessage(course ? "Course Successfully Updated" : "Course Empty")
        .setData(course)
        .send(course ? 200 : 204);
    } catch (error) {
      next(error);
    }
  },

  getAllCourse: async (
    request: AuthenticatedRequest,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const query = request.query as unknown as CourseFilterParamDto;
      const course = await CourseService.getAllCourse(
        query,
        query.page,
        query.limit
      );

      return new ApiResponse(response)
        .setStatus(true)
        .setMessage(course ? "Course are listed" : "Course Empty")
        .setData(course)
        .send(course ? 200 : 204);
    } catch (error) {
      next(error);
    }
  },

  update: async (
    request: AuthenticatedRequest,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const validateCourse = await UpdateCourseSchema.validateAsync(
        request.body
      );

      if (validateCourse?.error) {
        throw new BadRequestError(validateCourse?.error);
      }

      const { courseId } = request.params as { courseId: string };

      const updatePayload: Partial<UpdateCoursePayloadDto> = {
        ...request.body,
      };

      if (request.file) {
        updatePayload.thumbnilUrl = request.file.filename;
      }

      const updatedCourse = await CourseService.update(courseId, updatePayload);

      return new ApiResponse(response)
        .setStatus(true)
        .setMessage("Course Successfully Updated")
        .setData(updatedCourse)
        .send(200);
    } catch (error) {
      next(error);
    }
  },

  delete: async (
    request: AuthenticatedRequest,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const { courseId } = request.params as { courseId: string };
      const deleteCourse = await CourseService.delete(courseId);

      return new ApiResponse(response)
        .setStatus(true)
        .setMessage("Course Successfully Updated")
        .setData(deleteCourse)
        .send(200);
    } catch (error) {
      next(error);
    }
  },
};

export default CourseHandler;
