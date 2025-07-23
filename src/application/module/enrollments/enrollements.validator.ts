import Joi from "joi";

export const PaymentValidateSchema = Joi.object({
  amount: Joi.number().min(1).required(),
  paymentMethod: Joi.string().required(),
  courseId: Joi.string().required(),
  cardNumber: Joi.string(),
  cardName: Joi.string(),
  address: Joi.string(),
  state: Joi.string(),
  country: Joi.string(),
  postalCode: Joi.string(),
});
