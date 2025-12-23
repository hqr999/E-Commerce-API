const mongoose = require(`mongoose`);

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, `Por favor dê um nome para o produto`],
      maxlength: [100, `Nome não pode ter mais que 100 caracteres!`],
    },
    price: {
      type: String,
      required: [true, `Por favor dê um valor ao produto`],
      default: 0,
    },

    description: {
      type: String,
      required: [true, `Por favor dê uma descrição do produto`],
      maxlenght: [1000, `Descrições não podem ter mais que 1000 caracteres`],
    },
    image: {
      type: String,
      default: `/uploads/example.jpeg`,
    },
    category: {
      type: String,
      required: [true, `Por favor coloque o produto em uma categoria`],
      enum: [`office`, `bedroom`, `kitchen`],
    },
    company: {
      type: String,
      required: [true, `Por favor dê uma comapainha ao produto`],
      enum: {
        values: [`ikea`, `liddy`, `marcos`],
        maessage: `{VALUE} não é suportado`,
      },
    },
    colors: {
      type: [String],
      required: true,
      default: [`#222`],
    },
    featured: {
      type: Boolean,
      default: false,
    },
    freeShipping: {
      type: Boolean,
      default: false,
    },
    inventory: {
      type: Number,
      required: true,
      default: 15,
    },
    averageRating: {
      type: Number,
      default: 0,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: `User`,
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model(`Product`, ProductSchema);
