import { Router } from "express";
import AuthHandler from "./auth.controller";

const initAuthRoutes = (router: Router) => {
  router.post("/auth/register", AuthHandler.register);
  router.post("/auth/login", AuthHandler.login);
};

export default initAuthRoutes;