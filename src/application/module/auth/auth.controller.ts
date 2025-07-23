import { v4 as uuidv4 } from "uuid";
import { NextFunction, Request, Response } from "express";
import AuthService from "./auth.service";
import { CreateInstructorPayloadDto, SignUpPayloadDto } from "../../common/dto";
import ApiResponse from "../../common/utils/ApiSucessResponse";
import {
  RegisterUserSchema,
  LoginUserSchema,
  InstructorSchema,
} from "./auth.validator";
import { BadRequestError, UnAuthorizedError } from "../../errors";
import {
  AuthenticatedRequest,
  AuthUser,
} from "../../common/interface/AuthenticateRequest";

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
        .send(200);
    } catch (error) {
      next(error);
    }
  },

  createInstructor: async (
    request: AuthenticatedRequest,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const validate = await InstructorSchema.validateAsync(request.body);

      if (validate?.error) {
        throw new BadRequestError(validate?.error);
      }

      if (!request.user?.id) {
        return new UnAuthorizedError("Your not login yet");
      }

      if (!request.file) {
        return new BadRequestError("Please upload you profile picture");
      }

      const instrutor: CreateInstructorPayloadDto = {
        ...(request.body as { bio: string; expertise: string }),
        id: uuidv4(),
        userId: request.user?.id,
        profilePicUrl: request.file?.filename,
      };

      const createdInstructor = await AuthService.createInstrutorAccount(
        instrutor
      );

      return new ApiResponse(response)
        .setStatus(true)
        .setMessage("Hey Congrats your instructor now")
        .setData(createdInstructor)
        .send(200);
    } catch (error) {
      next(error);
    }
  },
};

export default AuthHandler;
