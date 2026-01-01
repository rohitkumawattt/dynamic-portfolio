import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

const {CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET} = process.env;
if(!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET){
    throw new Error("Cloudinary environment variables are not set");
}

cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
    secure: true,
})

// upload to cloudinary from here!

export const uploadToCloudinary = async (File) =>{
    try {
        if(!File) return null
        const response = await cloudinary.uploader.upload(File,{
            resource_type:"auto"
        })
        // console.log("File is uploaded successfully : ", response);
        fs.unlinkSync(File);
        return response 
    } catch (error) {
        fs.unlinkSync(File.path); // remove the file from the server or database
        if (File) fs.unlinkSync(File);
        // console.log("Error while uploading file to cloudinary : ", error);
        return null
    }
}

// delete from coudinary 
export const deleteFromCloudinary = async (public_id) =>{
    try {
        if(!public_id) return null
        const response = await cloudinary.uploader.destroy(public_id);
        console.log("File is deleted successfully : ", response);
        return response 
    } catch (error) {
        console.log("Error while deleting file from cloudinary : ", error);
        return null
    }
}

