import { Router } from "express";
import AuthHandler from "./auth.controller";
import multer from "multer";

const initAuthRoutes = (router: Router, multerStorage: multer.Multer) => {
  router.post("/auth/register", AuthHandler.register);
  router.post("/auth/login", AuthHandler.login);
  router.post(
    "/user/instructor",
    multerStorage.single("pictureUrl"),
    AuthHandler.createInstructor
  );
};

export default initAuthRoutes;
