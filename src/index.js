import express from "express";
import logger from "morgan";
import cors from "cors";
import path from "path";
import db from "./db/db.js";
import categoryRouter from "./app/category/router.js";
import productRouter from "./app/product/router.js";

const app = express();
const __dirname = path.resolve();

// middlewares
app.use(cors());
app.use(express.json());
app.use(logger("dev"));
app.use(express.static(path.join(__dirname, "./src/public")));
app.use(express.urlencoded({ extended: true }));

//root
app.get("/", (req, res) => {
  res.send("<h1>Hello express</h1>");
});
// router
app.use("/api", categoryRouter);
app.use("/api", productRouter);

app.use((req, res) => {
  res.status(404);
  res.send(`<h3>${req.originalUrl} not found</h3>`);
});

// listen
app.listen(3000, () => {
  console.log("app runnin on port 3000");
});
