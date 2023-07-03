import path from "path";
import Category from "./model.js";
import fs from "fs";

const __dirname = path.resolve();

export const listCategory = async (req, res, next) => {
  try {
    const category = await Category.find();
    return res.json(category);
  } catch (err) {
    next(err);
  }
};

export const indexCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);
    return res.json(category);
  } catch (err) {
    next(err);
  }
};

export const addCategory = async (req, res, next) => {
  try {
    let payload = req.body;

    if (req.files) {
      let filesUploads = JSON.parse(JSON.stringify(req.files));
      let bannerImg = filesUploads.banner_img[0].filename;
      let categoryImg = filesUploads.category_img[0].filename;

      let category = new Category({ ...payload, banner_img: bannerImg, category_img: categoryImg });
      await category.save();
      return res.json(category);
    } else {
      let category = new Category(payload);
      await category.save();
      return res.json(category);
    }
  } catch (err) {
    let filesUploads = JSON.parse(JSON.stringify(req.files));
    let dest = `${__dirname}/src/public/images/category`;
    let bannerImg = filesUploads.banner_img[0].filename;
    let categoryImg = filesUploads.category_img[0].filename;

    fs.unlinkSync(`${dest}/${bannerImg}`);
    fs.unlinkSync(`${dest}/${categoryImg}`);
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

export const updateCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    let payload = req.body;
    if (req.files) {
      let category = await Category.findById(id);
      let filesUploads = JSON.parse(JSON.stringify(req.files));
      let bannerImg = filesUploads.banner_img[0].filename;
      let categoryImg = filesUploads.category_img[0].filename;

      let dest = `${__dirname}/src/public/images/category`;
      let currentBannerImg = `${dest}/${category.banner_img}`;
      let currentCategoryImg = `${dest}/${category.category_img}`;

      if (fs.existsSync(currentBannerImg) && fs.existsSync(currentCategoryImg)) {
        fs.unlinkSync(currentBannerImg);
        fs.unlinkSync(currentCategoryImg);
      }

      category = await Category.findByIdAndUpdate(id, { ...payload, banner_img: bannerImg, category_img: categoryImg });
      return res.json(category);
    } else {
      let category = await Category.findByIdAndUpdate(id, payload);
      return res.json(category);
    }
  } catch (err) {
    let filesUploads = JSON.parse(JSON.stringify(req.files));
    let bannerImg = filesUploads.banner_img[0].filename;
    let categoryImg = filesUploads.category_img[0].filename;

    let dest = `${__dirname}/src/public/images/category`;
    let currentBannerImg = `${dest}/${bannerImg}`;
    let currentCategoryImg = `${dest}/${categoryImg}`;

    fs.unlinkSync(currentBannerImg);
    fs.unlinkSync(currentCategoryImg);

    if (err && err.name === "ValidationError") {
      res.json({
        error: 1,
        message: err.message,
        fields: err.errors,
      });
    }
    next(err);
  }
};

export const deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    let dest = `${__dirname}/src/public/images/category`;
    const category = await Category.findByIdAndDelete(id);
    let currentBannerImg = `${dest}/${category.banner_img}`;
    let currentCategoryImg = `${dest}/${category.category_img}`;
    if (fs.existsSync(currentBannerImg) || fs.existsSync(currentCategoryImg)) {
      fs.unlinkSync(currentBannerImg);
      fs.unlinkSync(currentCategoryImg);
    }
    return res.json(category);
  } catch (err) {
    next(err);
  }
};
