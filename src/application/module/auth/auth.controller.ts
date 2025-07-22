import { NextFunction, Request, Response } from "express";
import AuthService from "./auth.service";
import { SignUpPayloadDto } from "../../common/dto";
import ApiResponse from "../../common/utils/ApiSucessResponse";
import { RegisterUserSchema, LoginUserSchema } from "./auth.validator";
import { BadRequestError } from "../../errors";

const AuthHandler = {
  register: async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const validate = await RegisterUserSchema.validateAsync(request.body);

      if (validate?.error) {
        throw new BadRequestError(validate?.error);
      }

      const registeredUser = await AuthService.register(
        request.body as SignUpPayloadDto
      );

      return new ApiResponse(response)
        .setStatus(true)
        .setMessage("User Successfully Created")
        .setData(registeredUser)
        .send(201);
    } catch (error) {
      next(error);
    }
  },
  login: async (request: Request, response: Response, next: NextFunction) => {
    try {
      const validate = await LoginUserSchema.validateAsync(request.body);

      if (validate?.error) {
        throw new BadRequestError(validate?.error);
      }

      const loginUser = await AuthService.login(
        request.body as SignUpPayloadDto
      );

      return new ApiResponse(response)
        .setStatus(true)
        .setMessage("User Successfully Created")
        .setData(loginUser)
        .send(201);
    } catch (error) {
      next(error);
    }
  },
};

export default AuthHandler;
