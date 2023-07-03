import express from "express";
import { addProduct, indexProduct, listProduct, updateProduct, deleteProduct } from "./controller.js";
import uploadImageProduct from "../../uploads/product.js";

const route = express.Router();

route.get("/product", listProduct);
route.get("/product/:id", indexProduct);
route.delete("/product/:id", deleteProduct);
route.post("/product", uploadImageProduct, addProduct);
route.put("/product/:id", uploadImageProduct, updateProduct);

export default route;
