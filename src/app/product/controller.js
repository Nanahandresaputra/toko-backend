import Product from "./model.js";
import fs from "fs";
import path from "path";
import Category from "../category/model.js";

const __dirname = path.resolve();

export const listProduct = async (req, res, next) => {
  try {
    let { q = "", category = "" } = req.query;
    let criteria = {};

    if (q.length) {
      criteria = { ...criteria, name: { $regex: new RegExp(q, "i") } };
    }

    if (category.length) {
      let categoryResult = await Category.findOne({ name: { $regex: new RegExp(category, "i") } });
      if (categoryResult) {
        criteria = { ...criteria, category: categoryResult._id };
      }
    }

    const count = await Product.find().countDocuments();
    const product = await Product.find(criteria).populate("category");
    return res.json({ product, count });
  } catch (err) {
    next(err);
  }
};

export const indexProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    return res.json(product);
  } catch (err) {
    next(err);
  }
};

export const addProduct = async (req, res, next) => {
  try {
    let payload = req.body;

    if (payload.category) {
      let category = await Category.findOne({ name: { $regex: payload.category, $options: "i" } });
      console.log(category._id);
      if (category) {
        payload = { ...payload, category: category._id };
      } else {
        delete payload.category;
      }
    }

    if (req.file) {
      let image = req.file.filename;

      let product = new Product({ ...payload, image });
      await product.save();
      return res.json(product);
    } else {
      let product = new Product(payload);
      await product.save();
      return res.json(product);
    }
  } catch (err) {
    let image = req.file.filename;
    let currentImage = `${__dirname}/src/public/images/product/${image}`;

    fs.unlinkSync(currentImage);

    if (err && err.name === "ValidationError") {
      return res.json({
        error: 1,
        message: err.message,
        fields: err.errors,
      });
    }
    next(err);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    let payload = req.body;

    if (payload.category) {
      let category = await Category.findOne({ name: { $regex: payload.category, $options: "i" } });
      console.log(category._id);
      if (category) {
        payload = { ...payload, category: category._id };
      } else {
        delete payload.category;
      }
    }

    if (req.file) {
      let product = await Product.findById(id);
      let image = req.file.filename;
      let currentImage = `${__dirname}/src/public/images/product/${product.image}`;

      if (fs.existsSync(currentImage)) {
        fs.unlinkSync(currentImage);
      }

      product = await Product.findByIdAndUpdate(id, { ...payload, image });
      return res.json(product);
    }
  } catch (err) {
    let image = req.file.filename;
    let currentImage = `${__dirname}/src/public/images/product/${image}`;

    fs.unlinkSync(currentImage);

    if (err && err.name === "ValidationError") {
      return res.json({
        error: 1,
        message: err.message,
        fields: err.errors,
      });
    }
    next(err);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndDelete(id);
    let currentImage = `${__dirname}/src/public/images/product/${product.image}`;
    fs.unlinkSync(currentImage);
    return res.json(product);
  } catch (err) {
    next(err);
  }
};
