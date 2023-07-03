import { Schema, model } from "mongoose";

const categorySchema = Schema({
  name: {
    type: String,
    required: [true, "Product name required"],
  },
  banner_img: {
    type: String,
  },
  category_img: {
    type: String,
  },
});

export default model("Category", categorySchema);
