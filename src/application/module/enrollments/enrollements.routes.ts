import { Router } from "express";
import EnrollementHandler from "./enrollments.controller";
import JwtMiddleware from "../../middleare/jwt.middleware";

const initEnrollementRoutes = (router: Router) => {
  router.use(JwtMiddleware.verifyToken);
  router.post("/enrollments", EnrollementHandler.enrollCourse);
  router.delete(
    "/enrollments/cancel/:courseId",
    EnrollementHandler.cancelEnroll
  );
  router.get(
    "/enrollments/has-enrolled/:courseId",
    EnrollementHandler.hasEnrolled
  );

  router.post("/enrollment/payment", EnrollementHandler.processPayment);
};

export default initEnrollementRoutes;
