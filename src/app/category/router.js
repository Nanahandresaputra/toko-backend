import express from "express";
import uploadCategoryImg from "../../uploads/category.js";
import { addCategory, listCategory, deleteCategory, indexCategory, updateCategory } from "./controller.js";

const route = express.Router();

route.get("/category", listCategory);
route.get("/category/:id", indexCategory);
route.delete("/category/:id", deleteCategory);
route.post("/category", uploadCategoryImg, addCategory);
route.put("/category/:id", uploadCategoryImg, updateCategory);

export default route;
