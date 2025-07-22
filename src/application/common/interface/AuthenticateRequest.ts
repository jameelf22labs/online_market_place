import { Request } from "express";
import Courses from "../../database/models/Courses.model";

export type AuthUser = {
  name: string;
  email: string;
  role: string;
};

export type AuthInstructor = {
  id: string;
  bio: string;
  profilePicUrl: string;
  expertise: string;
  userId: string;
  courses?: Courses[];
};

export type AuthenticatedRequest<T = any> = Request<{}, {}, T> & {
  user?: AuthUser;
  instructor?: AuthInstructor;
};
