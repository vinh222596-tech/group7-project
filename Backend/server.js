import "dotenv/config";
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/user.js';
import { v2 as cloudinary } from 'cloudinary';
cloudinary.config({
  cloud_name: "dcok862mt",
  api_key: "879897979463541",
  api_secret: "np863WkLnvHSxsU3kpLIXb2ckXk"
});
const app = express();
const port = 3000;


app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(userRoutes);


mongoose.connect("mongodb+srv://QuocVinh:abawdawdwadwa@groupdb.10zsccc.mongodb.net/?appName=users")
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("Connection error:", err));
app.listen(port, () => {
  console.log(`Server Started With Port ${port}`);
});