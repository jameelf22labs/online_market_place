import { Request } from "express";

export type AuthUser = {
    name: string; email: string; role: string
}
export type AuthenticatedRequest<T = any> = Request<{}, {}, T> & {
  user?: AuthUser;
};
