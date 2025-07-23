import { Router } from "express";
import AuthHandler from "./auth.controller";
import multer from "multer";
import JwtMiddleware from "../../middleare/jwt.middleware";

const initAuthRoutes = (router: Router, multerStorage: multer.Multer) => {
  router.post("/auth/register", AuthHandler.register);
  router.post("/auth/login", AuthHandler.login);

  router.post(
    "/user/instructor",
    [JwtMiddleware.verifyToken , multerStorage.single("pictureUrl")],
    AuthHandler.createInstructor
  );
};

export default initAuthRoutes;
