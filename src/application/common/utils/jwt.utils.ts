import jwt, { SignOptions } from "jsonwebtoken";
import envConfig from "../../../config/env-config";
import { AuthUser } from "../interface/AuthenticateRequest";

const JwtUtils = {
  generateToken: (payload: AuthUser, expired: string = "1d") => {
    return jwt.sign(payload, envConfig.JwtSectret, {
      expiresIn: expired,
    } as SignOptions);
  },
};

export default JwtUtils;
