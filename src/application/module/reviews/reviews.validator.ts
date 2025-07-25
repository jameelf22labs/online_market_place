import Joi from "joi";

export const CreateReviewSchema = Joi.object({
  rating: Joi.number().integer().min(1).max(5).required(),
  comment: Joi.string().max(1000).allow("", null),
  enrollmentId: Joi.string().uuid().required(),
  courseId: Joi.string().uuid().required(),
});

export const UpdateReviewSchema = Joi.object({
  rating: Joi.number().integer().min(1).max(5).optional(),
  comment: Joi.string().max(1000).allow("", null).optional(),
});
