import { Router } from "express";
import multer from "multer";
import CourseHandler from "./course.controller";
import isInstructor from "../../middleare/instructor.middleware";

const initCourseRoutes = (router: Router, multerStorage: multer.Multer) => {

  router.get('/course/get/:courseId' , CourseHandler.getByCourseId)

  router.use(isInstructor);

  router.post(
    "/course/create",
    multerStorage.single("thumbnil"),
    CourseHandler.create
  );

  router.put(
    "/course/update/:courseId",
    multerStorage.single("thumbnil"),
    CourseHandler.update
  );

  router.delete("/course/delete/:courseId", CourseHandler.delete);
};

export default initCourseRoutes;
