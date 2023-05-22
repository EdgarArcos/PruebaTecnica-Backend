import cloudinary from "cloudinary";
import { CLOUD_NAME, CLOUD_KEY, CLOUD_SECRET } from "../config.js";

cloudinary.config({
    cloud_name:CLOUD_NAME,
    api_key:CLOUD_KEY,
    api_secret:CLOUD_SECRET 
})

export const uploadImage = async (filePath) => {
    return await cloudinary.v2.uploader.upload(filePath, {
        folder: 'Posts'
    })
}

export const deleteImage = async id =>{
    return await cloudinary.uploader.destroy(id)
}