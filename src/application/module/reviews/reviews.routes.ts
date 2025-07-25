import { Router } from "express";
import ReviewHandler from "./reviews.controller";
import JwtMiddleware from "../../middleare/jwt.middleware";

const initReviewRoutes = (router: Router) => {
  router.use(JwtMiddleware.verifyToken);
  router.post("/reviews/create-review", ReviewHandler.createReview);
  router.put("/reviews/update-review/:reviewId", ReviewHandler.updateReview);
  router.delete("/reviews/delete-review/:reviewId", ReviewHandler.deleteReview);
  router.get("/review/:courseId/get-all", ReviewHandler.getAllReview);
  router.get("/review/:courseId/avg-rating", ReviewHandler.getReviewAvgRating);
};

export default initReviewRoutes;
