import { Router } from "express";
import multer from "multer";
import isInstructor from "../../middleare/instructor.middleware";
import LectureHandler from "./lecture.controller";

const initCourseRoutes = (router: Router, multerStorage: multer.Multer) => {
  router.use(isInstructor);

  router.post(
    "/lecture/create",
    multerStorage.single("lecture_video"),
    LectureHandler.create
  );
  router.put(
    "/lecture/update/:lectureId",
    multerStorage.single("lecture_video"),
    LectureHandler.update
  );
  router.delete("/lecture/delete/:lectureId", LectureHandler.delete);
};

export default initCourseRoutes;
