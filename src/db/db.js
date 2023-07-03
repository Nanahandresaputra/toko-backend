import mongoose from "mongoose";

mongoose.connect("mongodb+srv://toko:toko@toko-online.bgwfyzx.mongodb.net/");

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection Error"));
db.once("open", () => console.log("database connected"));

export default db;
