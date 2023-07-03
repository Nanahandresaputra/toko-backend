import { error } from "console";
import multer from "multer";
import path from "path";
// import config from "../config/config.js";

const __dirname = path.resolve();

const imageCategories = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "./src/public/images/category"));
  },
  filename: (req, file, cb) => {
    let originalExt = file.originalname.split(".")[file.originalname.split(".").length - 1];
    cb(null, `${Date.now().toString()}.${originalExt}`);
  },
});

const extensionAllowImg = ["image/png", "image/jpeg", "image/jpg", "image/webp"];

const uploadCategoryImg = multer({
  storage: imageCategories,
  fileFilter: (req, file, cb) => {
    if (!extensionAllowImg.includes(file.mimetype)) {
      return cb(new error("upload image file only"));
    }
    return cb(null, true);
  },
}).fields([
  { name: "banner_img", maxCount: 1 },
  { name: "category_img", maxCount: 1 },
]);

export default uploadCategoryImg;
