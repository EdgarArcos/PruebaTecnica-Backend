import Post from "../models/Post.js";
import { uploadImage, deleteImage } from "../Library/cloudinary.js";
import fs from "fs-extra";


export const getPosts = async (req, res) => {
    try {
        const posts = await Post.find()
        res.send(posts)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
export const createPosts = async (req, res) => {
    try {
        const { title, description, user } = req.body
        let image;
        if (req.files?.image) {
            const result = await uploadImage(req.files.image.tempFilePath)
            image = {
                url: result.secure_url,
                public_id: result.public_id
            }
            await fs.remove(req.files.image.tempFilePath)
        }

        const newPost = new Post({ title, description, image, user })
        await newPost.save()
        return res.json(newPost)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const updatingPosts = async (req, res) => {
    try {
        await Post.findByIdAndUpdate(req.params.id, req.body, { new: true })
        return res.send("received")
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const deletingPosts = async (req, res) => {
    try {
        const postRemoved = await Post.findByIdAndDelete(req.params.id)
        if (!postRemoved) return res.sendStatus(404)
        if (postRemoved.image.public_id) await deleteImage(postRemoved.image.public_id)
        return res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const getPostId = async (req, res) => {
    try {
        const postById = await Post.findById(req.params.id)
        if (!postById) return res.sendStatus(404)
        return res.json(postById)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}