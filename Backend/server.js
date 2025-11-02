import "dotenv/config";
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/user.js';

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