import express from 'express'
import CommentRoutes from "./Comments/routes.js";
import cors from "cors";
// import CommentsRoutes from './Comments/routes.js';
import mongoose from "mongoose";
mongoose.connect("mongodb://127.0.0.1:27017/recipes");

const app = express()
app.use(cors());
app.use(express.json());
CommentRoutes(app);

app.listen(4000);