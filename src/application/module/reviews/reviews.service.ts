import { v4 } from "uuid";
import { ReviewDto } from "../../common/dto";
import { EnrollmentsStatusEnum } from "../../database/enums/enrollement.status.enum";
import Enrollments from "../../database/models/Enrollments.model";
import Review from "../../database/models/Review.model";
import { BadRequestError, NotFoundError } from "../../errors";
import { sql } from "@sequelize/core";

const ReviewService = {
  createReview: async (review: ReviewDto): Promise<{ id: string }> => {
    const enrollment = await Enrollments.findByPk(review.enrollmentId);

    if (!enrollment) {
      throw new NotFoundError("Enrollment not found");
    }

    if (enrollment.status !== EnrollmentsStatusEnum.Complete) {
      throw new BadRequestError("Only completed enrollments can be reviewed");
    }

    const existingReview = await Review.findOne({
      where: { enrollmentId: review.enrollmentId },
    });

    if (existingReview) {
      throw new BadRequestError("Review already exists for this enrollment");
    }

    const createdReview = await Review.create({
      ...review,
      id: v4(),
    });

    return { id: createdReview.id };
  },

  updateReview: async (
    reviewId: string,
    updateReview: Partial<ReviewDto>
  ): Promise<{ id: string }> => {
    const review = await Review.findByPk(reviewId);

    if (!review) {
      throw new NotFoundError("Review not found");
    }

    await review.update(updateReview);

    return { id: review.id };
  },

  deleteReview: async (reviewId: string): Promise<void> => {
    const deleted = await Review.destroy({ where: { id: reviewId } });

    if (!deleted) {
      throw new NotFoundError("Review not found");
    }
  },

  getAllReview: async (courseId: string, page = 1, limit = 10) => {
    const offset = (page - 1) * limit;

    const { rows: reviews, count } = await Review.findAndCountAll({
      where: { courseId },
      offset,
      limit,
      order: [["createdAt", "DESC"]],
    });

    return {
      total: count,
      page,
      pages: Math.ceil(count / limit),
      data: reviews,
    };
  },

  getAvgRating: async (courseId: string): Promise<number> => {
    const result = (await Review.findOne({
      attributes: [[sql`AVG(rating)`, "avgRating"]],
      where: { courseId },
      raw: true,
    })) as { avgRating: string };

    return Number(result?.avgRating || 0);
  },
};

export default ReviewService;
