import { Schema, model } from "mongoose";

const ProductSchema = Schema({
  name: {
    type: String,
    minlength: [3, "product name minimum 3 character and maximum 50 character "],
    maxlength: [50, "product name minimum 3 character and maximum 50 character "],
    required: [true, "product name required"],
  },
  price: {
    type: Number,
    required: [true, "price required"],
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
  description: {
    type: String,
    min: [3, "description minimum 3 character"],
  },
  image: {
    type: String,
  },
});

export default model("Product", ProductSchema);
