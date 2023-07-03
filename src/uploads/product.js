import { error } from "console";
import multer from "multer";
import path from "path";

const __dirname = path.resolve();

const imageProduct = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "./src/public/images/product"));
  },
  filename: (req, file, cb) => {
    let originalExt = file.originalname.split(".")[file.originalname.split(".").length - 1];
    cb(null, `${Date.now().toString()}.${originalExt}`);
  },
});

const extensionAllowImg = ["image/png", "image/jpeg", "image/jpg", "image/webp"];

const uploadImageProduct = multer({
  storage: imageProduct,
  fileFilter: (req, file, cb) => {
    if (!extensionAllowImg.includes(file.mimetype)) {
      return cb(new error("upload image file only"));
    }
    return cb(null, true);
  },
}).single("image");

export default uploadImageProduct;
