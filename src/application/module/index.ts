import multer from "multer";
import { Router } from "express";
import initAuthRoutes from "./auth/auth.routes";
import initCourseRoutes from "./course/course.routes";
import initLectureRoutes from "./lectures/lecture.routes";
import initCategoryRoutes from "./categories/categories.routes";
import initEnrollementRoutes from "./enrollments/enrollements.routes";

const importRoutes = (multerStorage: multer.Multer) => {
  const router = Router();
  initAuthRoutes(router, multerStorage);
  initCourseRoutes(router, multerStorage);
  initLectureRoutes(router, multerStorage);
  initCategoryRoutes(router);
  initEnrollementRoutes(router)
  return router;
};

export default importRoutes;
