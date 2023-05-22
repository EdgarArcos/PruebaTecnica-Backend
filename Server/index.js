import postsRoutes from "./routes/posts.routes.js";
import express from "express";
import fileUpload from "express-fileupload";
import { connectDB } from "./db.js";
const app = express()
connectDB()
app.use(express.json());
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "./upload"
}))
app.use(postsRoutes)

app.listen(4000)
console.log("Server is running");