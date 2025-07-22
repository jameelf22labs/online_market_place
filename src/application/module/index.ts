import { Router } from "express";
import initAuthRoutes from "./auth/auth.routes";
import initCourseRoutes from "./course/course.routes";
import multer from "multer";

const importRoutes = (multerStorage : multer.Multer) => {
  const router = Router();

  initAuthRoutes(router);
  initCourseRoutes(router , multerStorage);

  return router;
};

export default importRoutes;
