import { NextFunction, Response } from "express";
import { AuthenticatedRequest } from "../../common/interface/AuthenticateRequest";
import { CreateLectureSchema } from "./lecture.validator";
import { BadRequestError } from "../../errors";

const LectureHandler = {
  create: async (
    request: AuthenticatedRequest,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const validateLecture = await CreateLectureSchema.validateAsync(
        request.body
      );

      if (validateLecture?.error) {
        throw new BadRequestError(validateLecture?.error);
      }
 
    } catch (error) {
      next(error);
    }
  },

  get: async (
    request: AuthenticatedRequest,
    response: Response,
    next: NextFunction
  ) => {
    try {
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
    } catch (error) {
      next(error);
    }
  },
};
