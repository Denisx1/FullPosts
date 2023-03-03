import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { PORT, DB_NAME, DB_PASSWORD, DB_USER } from "./config/index.js";
import authRoute from "./routers/authRout.js";
import postRoute from "./routers/postRout.js";
import commentRoute from "./routers/commentRoute.js";
import fileUpload from "express-fileupload";

const app = express();

app.use(cors());
app.use(fileUpload());
app.use(express.json());
app.use(express.static("uploads"));

app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);
app.use("/api/comments", commentRoute);

async function start() {
  try {
    mongoose.set("strictQuery", false);
    await mongoose
      .connect(
        `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.hinx3ry.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`
      )
      .then((data) => console.log("DataBase Connect"));
    app.listen(PORT, () => {
      console.log(`Server start on ${PORT} port`);
    });
  } catch (error) {
    console.log(error);
  }
}
start();
