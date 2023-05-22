import postsRoutes from "./routes/posts.routes.js";
import express from "express";
import { connectDB } from "./db.js";
const app = express()
connectDB()
app.use(postsRoutes)

app.listen(4000)
console.log("Server is running");