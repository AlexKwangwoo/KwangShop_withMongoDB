const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = mongoose.Schema(
  {
    writer: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
      maxlength: 50,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      default: 0,
    },
    images: {
      type: Array,
      default: [],
    },
    sold: {
      type: Number,
      maxlength: 100,
      default: 0,
    },

    itemType: {
      type: Number,
      default: 1,
    },

    size: {
      type: Number,
      default: 1,
    },

    color: {
      type: Number,
      default: 1,
    },

    views: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

productSchema.index(
  //여기가 서칭기능을 가능케한다!!!
  {
    title: "text",
    description: "text",
  },
  {
    weights: {
      //타이틀을 좀더 중요하게 검색을 해준다!!
      title: 5,
      description: 1,
    },
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = { Product };
