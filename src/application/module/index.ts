import { Router } from "express";
import initAuthRoutes from "./auth/auth.routes";
import initCourseRoutes from "./course/course.routes";
import multer from "multer";
import JwtMiddleware from "../middleare/jwt.middleware";

const importRoutes = (multerStorage: multer.Multer) => {
  const router = Router();
  initAuthRoutes(router, multerStorage);
  router.use(JwtMiddleware.verifyToken);
  initCourseRoutes(router, multerStorage);
  return router;
};

export default importRoutes;
