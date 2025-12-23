const express = require("express");
const router = express.Router();
const { authenticateUser } = require("../middleware/authentication");

const {
  criaReview,
  pegaTodasReviews,
  pegaUnicaReview,
  atualizaReview,
  deletaReview,
} = require("../Controllers/reviewController");

router.route("/").post(authenticateUser, criaReview).get(pegaTodasReviews);

router
  .route("/:id")
  .get(pegaUnicaReview)
  .patch(authenticateUser, atualizaReview)
  .delete(authenticateUser, deletaReview);

module.exports = router;
