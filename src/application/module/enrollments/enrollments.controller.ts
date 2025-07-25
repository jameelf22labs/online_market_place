import { NextFunction, Response } from "express";
import {
  AuthenticatedRequest,
  AuthUser,
} from "../../common/interface/AuthenticateRequest";
import EnrollementService from "./enrollements.service";
import Joi, { string } from "joi";
import ApiResponse from "../../common/utils/ApiSucessResponse";
import { EnrollmentQueryHelper } from "../../database/helpers";
import { PaymentValidateSchema } from "./enrollements.validator";
import Enrollments from "../../database/models/Enrollments.model";

const EnrollementHandler = {
  enrollCourse: async (
    request: AuthenticatedRequest,
    response: Response,
    next: NextFunction
  ) => {
    try {
      await Joi.object({
        courseId: string().required(),
      }).validateAsync(request.body);

      const user = request.user as AuthUser;

      const enrolled = await EnrollementService.enrollCourse(
        {
          userId: user.id,
          courseId: request.body.courseId,
        },
        {
          email: user.email,
          name: user.name,
        }
      );

      return new ApiResponse(response)
        .setStatus(true)
        .setMessage("Successfully enrolled")
        .setData(enrolled)
        .send();
    } catch (error) {
      next(error);
    }
  },

  cancelEnroll: async (
    request: AuthenticatedRequest,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const { courseId } = request.params as { courseId: string };

      await EnrollementService.cancelEnroll({
        userId: (request.user as AuthUser).id,
        courseId,
      });

      return new ApiResponse(response)
        .setStatus(true)
        .setMessage("Cancel your Enrolled")
        .setData({})
        .send();
    } catch (error) {
      next(error);
    }
  },

  hasEnrolled: async (
    request: AuthenticatedRequest,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const { courseId } = request.params as { courseId: string };

      const hasEnrolled = await EnrollmentQueryHelper.isUserEnrolledInCourse(
        (request.user as AuthUser).id,
        courseId
      );

      const enroll = await Enrollments.findOne({
        where: { userId: (request.user as AuthUser).id, courseId },
      });

      return new ApiResponse(response)
        .setStatus(true)
        .setMessage("Enrollement Status")
        .setData({ enrolled: hasEnrolled, id: enroll?.id })
        .send();
    } catch (error) {
      next(error);
    }
  },

  processPayment: async (
    request: AuthenticatedRequest,
    response: Response,
    next: NextFunction
  ) => {
    try {
      await PaymentValidateSchema.validateAsync(request.body);
      const user = request.user as AuthUser;
      const payment = await EnrollementService.processPayment(
        {
          ...request.body,
          userId: user.id,
        },
        { email: user.email, name: user.name }
      );

      return new ApiResponse(response)
        .setData(payment)
        .setStatus(true)
        .setMessage("Payment Suceesfully")
        .send();
    } catch (error) {
      next(error);
    }
  },
};

export default EnrollementHandler;
