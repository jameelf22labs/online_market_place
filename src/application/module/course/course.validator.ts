import Joi from "joi";

export const CreateCourseSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string(),
  price: Joi.number().required(),
  instructorId: Joi.string().required(),
  categoryId: Joi.string().required(),
});

export const UpdateCourseSchema = Joi.object({
  title: Joi.string(),
  description: Joi.string(),
  price: Joi.number(),
});
