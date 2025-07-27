import { Router } from "express";
import JwtMiddleware from "../../middleare/jwt.middleware";
import isInstructor from "../../middleare/instructor.middleware";
import CategorieHandler from "./categories.controller";

const initCategoryRoutes = (router: Router) => {
  router.post(
    "/categorie",
    [JwtMiddleware.verifyToken, isInstructor],
    CategorieHandler.addCategorie
  );

  router.get("/categorie", CategorieHandler.getAllCategories);
};

export default initCategoryRoutes;
