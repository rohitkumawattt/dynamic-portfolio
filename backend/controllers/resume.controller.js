import Resume from "../models/rerume.model.js";
import { uploadToCloudinary, deleteFromCloudinary } from "../utils/cloudinary.js";

// get resume 

export const getResume = async (req, res) => {
    try {
        const resume = await Resume.findOne().sort({ createdAt: -1 }); // Latest wala fetch karein
        if(!resume){
            return res.status(404).json({
                success:false,
                message:"Resume not found"
            })
        }
        res.status(200).json({
            success:true,
            message:"Resume fetched successfully",
            resumeDetails: resume
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}

// CREATE / UPDATE: Upload Resume
export const uploadResume = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Resume file is required",
            })
        }
        const existingResume = await Resume.findOne();
        const resumeUrl = await uploadToCloudinary(req.file.path);
        if (existingResume) {
            // Delete old resume from cloudinary
            await deleteFromCloudinary(existingResume.public_id);
            existingResume.resume = req.file.originalname;
            existingResume.cloudinaryUrl = resumeUrl.secure_url;
            existingResume.cloudinaryId = resumeUrl.public_id;
            await existingResume.save();
        }else{
            await Resume.create({
                resume: req.file.originalname,
                cloudinaryUrl: resumeUrl.secure_url,
                cloudinaryId: resumeUrl.public_id,
            });
        }
        res.status(201).json({
            success:true,
            message:"Resume uploaded successfully",
            resume:existingResume
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Internal server error",
            error:error.message
        })
    }
}