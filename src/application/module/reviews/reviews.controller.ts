import { NextFunction, Response } from "express";
import { AuthenticatedRequest } from "../../common/interface/AuthenticateRequest";
import ReviewService from "./reviews.service";
import { CreateReviewSchema, UpdateReviewSchema } from "./reviews.validator";
import { BadRequestError } from "../../errors";
import ApiResponse from "../../common/utils/ApiSucessResponse";

const ReviewHandler = {
  createReview: async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const validatedBody = await CreateReviewSchema.validateAsync(req.body);

      const created = await ReviewService.createReview({
        ...validatedBody,
        userId: req.user?.id,
      });

      return new ApiResponse(res)
        .setStatus(true)
        .setMessage("Review successfully created")
        .setData(created)
        .send(201);
    } catch (err) {
      next(err);
    }
  },

  updateReview: async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const validatedBody = await UpdateReviewSchema.validateAsync(req.body);
      const { reviewId } = req.params as { reviewId: string };

      const updated = await ReviewService.updateReview(reviewId, validatedBody);

      return new ApiResponse(res)
        .setStatus(true)
        .setMessage("Review successfully updated")
        .setData(updated)
        .send(200);
    } catch (err) {
      next(err);
    }
  },

  deleteReview: async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { reviewId } = req.params as { reviewId: string };
      await ReviewService.deleteReview(reviewId);

      return new ApiResponse(res)
        .setStatus(true)
        .setMessage("Review successfully deleted")
        .send(200);
    } catch (err) {
      next(err);
    }
  },

  getAllReview: async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {

      const { courseId } = req.params as { courseId: string };
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      const reviews = await ReviewService.getAllReview(courseId , page, limit);

      return new ApiResponse(res)
        .setStatus(true)
        .setMessage(
          reviews?.data?.length
            ? "Reviews listed successfully"
            : "No reviews found"
        )
        .setData(reviews)
        .send(200);
    } catch (err) {
      next(err);
    }
  },

  getReviewAvgRating: async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { courseId } = req.params as { courseId: string };
      const avgRating = await ReviewService.getAvgRating(courseId);

      return new ApiResponse(res)
        .setStatus(true)
        .setMessage("Average rating calculated")
        .setData({ courseId, avgRating })
        .send(200);
    } catch (err) {
      next(err);
    }
  },
};

export default ReviewHandler;
