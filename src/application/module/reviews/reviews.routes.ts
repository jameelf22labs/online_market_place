import { Router } from "express";
import ReviewHandler from "./reviews.controller";

const initReviewRoutes = (router: Router) => {
  router.post("/reviews/create-review", ReviewHandler.createReview);
  router.put("/reviews/update-review/:reviewId", ReviewHandler.updateReview);
  router.delete("/reviews/delete-review/:reviewId", ReviewHandler.deleteReview);
  router.get("/review/get-all", ReviewHandler.getAllReview);
  router.get("/review/avg-rating", ReviewHandler.getReviewAvgRating);
};
