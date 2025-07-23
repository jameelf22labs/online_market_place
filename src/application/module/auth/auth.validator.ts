import Joi, { string } from "joi";

export const RegisterUserSchema = Joi.object({
  name: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(12).required(),
});

export const LoginUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(12).required(),
});


export const InstructorSchema = Joi.object({
  bio : Joi.string().required(),
  expertise : Joi.string().required()
})