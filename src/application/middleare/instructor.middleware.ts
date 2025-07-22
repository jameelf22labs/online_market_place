import { NextFunction, Request, Response } from "express";
import {
  AuthenticatedRequest,
  AuthUser,
} from "../common/interface/AuthenticateRequest";
import { UnAuthorizedError } from "../errors";
import { Roles } from "../database/enums/role.enums";
import { UserQueryHelper } from "../database/helpers";
import { User } from "../database/models";

const isInstructor = async (
  request: AuthenticatedRequest,
  response: Response,
  next: NextFunction
) => {
  const user: AuthUser | undefined = request.user;

  if (!user) {
    return next(
      new UnAuthorizedError("Your not login yet. please login then try")
    );
  }

  if (user.role !== Roles.Instructor) {
    return next(
      new UnAuthorizedError(
        "Access Denied, Only Instructor can access this endpoint"
      )
    );
  }

  const userDoc = (await UserQueryHelper.findOne({
    email: user.email,
  })) as User;

  request.instructor = userDoc.instructure;

  next();
};

export default isInstructor;
