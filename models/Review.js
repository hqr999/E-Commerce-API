const mongoose = require("mongoose");

const ReviewSchema = mongoose.Schema(
  {
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: [true, "Por favor dê uma avaliação"],
    },
    title: {
      type: String,
      trim: true,
      required: [true, "Por favor dê um título da avaliação"],
      maxlength: 100,
    },
    comment: {
      type: String,
      required: [true, "Por favor dê um texto para a avaliação "],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      type: mongoose.Schema.ObjectId,
      ref: "Product",
      required: true,
    },
  },
  { timestamps: true },
);

ReviewSchema.index({ product: 1, user: 1 }, { unique: true });

module.exports = mongoose.model("Review", ReviewSchema);
