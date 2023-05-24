import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    image: {
        url: String,
        public_id: String,
    },
    user: {
        type: String,
        required: true,
    }
})

export default mongoose.model("Post", postSchema)