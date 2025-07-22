import jwt, { JwtPayload } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { UnAuthorizedError } from "../errors";
import envConfig from "../../config/env-config";
import {
  AuthenticatedRequest,
  AuthUser,
} from "../common/interface/AuthenticateRequest";

const JwtMiddleware = {
  verifyToken: (request: Request, response: Response, next: NextFunction) => {
    const authHeader = request.header("Authorization");

    if (!authHeader || !authHeader.includes("Bearer ")) {
      return next(new UnAuthorizedError(" Token was missing "));
    }

    const accessToken = authHeader.replace("Bearer ", "").trim();

    try {
      const payload = jwt.verify(
        accessToken,
        envConfig.JwtSectret
      ) as JwtPayload;

      (request as AuthenticatedRequest).user = payload as AuthUser;

      next();
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
        return next(new UnAuthorizedError("Invalid token"));
      }

      if (error instanceof jwt.TokenExpiredError) {
        return next(new UnAuthorizedError("Token expired"));
      }

      next(new Error("Something went wrong"));
    }
  },
};

export default JwtMiddleware;
