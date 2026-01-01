import userProfile from "../models/userProfile.model.js";
import { uploadToCloudinary, deleteFromCloudinary } from "../utils/cloudinary.js";
import User from "../models/user.model.js";
// get full userData from userProfile model
export const getUserProfile = async (req, res) => {
    try {
        const { userId } = req.params;
        const profile = await userProfile.find({ user: userId }).populate("user", "name email");
        if (!profile) {
            return res.status(404).json({
                success: false,
                message: "Profile not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "profile fetched successfully",
            profile
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// upload the avatar to database

export const uploadAvatar = async (req, res) => {
    try {
        // check file
        if (!req.file) {
            return res.status(400).json({
                success: true,
                message: "File required",
            })
        }
        let profile = await userProfile.findOne({ user: req.user._id });
        if (!profile) {
            profile = new userProfile({ user: req.user._id });
        }
        // Upload to Cloudinary 
        const uploaded = await uploadToCloudinary(req.file.path);
        // If profile already had an avatar, delete the old avatar from Cloudinary
        if (profile.avatar?.public_id) {
            await deleteFromCloudinary(profile.avatar.public_id);
        }

        // save avatar 
        profile.avatar = {
            url: uploaded.secure_url,
            public_id: uploaded.public_id,
        };
        await profile.save();
        res.status(200).json({
            success: true,
            message: "Avatar uploaded successfully",
            avatar: profile.avatar.url,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
}

// updateAvatar

export const updateAvatar = async (req, res) => {
    try {
        // 1. File check
        if (!req.file) {
            return res.status(400).json({ success: false, message: "File required" });
        }
        const profile = await userProfile.findOne({ user: req.user._id });
        if (!profile) {
            return res.status(404).json({
                success: false,
                message: "Profile not found",
            });
        }
        // 2. Upload to Cloudinary
        const uploaded = await uploadToCloudinary(req.file.path);
        if (!uploaded) {
            return res.status(500).json({
                success: false,
                message: "Cloudinary upload failed",
            });
        }
        // 3. delete old avatar
        if (profile.avatar?.public_id && profile.avatar) {
            await deleteFromCloudinary(profile.avatar.public_id);
        }
        // 4. Update Avatar
        profile.avatar = {
            url: uploaded.secure_url,
            public_id: uploaded.public_id,
        };
        await profile.save();
        res.status(200).json({
            success: true,
            message: "Avatar updated successfully",
            avatar: profile.avatar.url,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
};

// update about user section

export const updateAbout = async (req, res) => {
    try {
        const { about } = req.body;
        if (!about) {
            return res
                .status(400)
                .json({ success: false, message: "About required" });
        }
        const profile = await userProfile.findOne({ user: req.user._id });
        if (!profile) {
            return res.status(404).json({
                success: false,
                message: "Profile not found",
            });
        }
        profile.about = about;
        await profile.save();
        res.status(200).json({
            success: true,
            message: "About updated successfully",
            about: profile.about,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
};

// update social media links

export const updateSocialMediaLinks = async (req, res) => {
    try {
        const { github, linkedin, instagram } = req.body;
        const profile = await userProfile.findOne({ user: req.user._id });
        profile.socialLinks = {
            github: github || profile.socialLinks?.github || "",
            linkedin: linkedin || profile.socialLinks?.linkedin || "",
            instagram: instagram || profile.socialLinks?.instagram || "",
        };
        await profile.save();
        res.status(200).json({
            success: true,
            message: "Social media links updated successfully",
            socialLinks: profile.socialLinks,
        });
    } catch (error) {
        res
            .status(500)
            .json({
                success: false,
                message: "Internal server error",
                error: error.message,
            });
    }
};
