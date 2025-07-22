import { Router } from "express";
import initAuthRoutes from "./auth/auth.routes";

const importRoutes = () => {
  const router = Router();
  initAuthRoutes(router);
  return router;
};


export default importRoutes;