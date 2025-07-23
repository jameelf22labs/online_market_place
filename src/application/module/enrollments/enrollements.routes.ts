import { Router } from "express";
import EnrollementHandler from "./enrollments.controller";

const initEnrollementRoutes = (router: Router) => {
  router.post("/enrollments", EnrollementHandler.enrollCourse);
  router.delete(
    "/enrollments/cancel/:courseId",
    EnrollementHandler.cancelEnroll
  );
  router.get(
    "/enrollments/has-enrolled/:courseId",
    EnrollementHandler.hasEnrolled
  );
};

export default initEnrollementRoutes;
