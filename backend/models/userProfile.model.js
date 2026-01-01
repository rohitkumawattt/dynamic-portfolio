import mongoose from "mongoose";


const userProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    role: {
        type: String,
    },
    // ✅ Avatar stored from Cloudinary
    avatar: {
        url: {
            type: String,
            default: "",
        },
        public_id: {
            type: String,
            default: "",
        },
    },

    // ✅ About section
    about: {
        type: String,
        default: "",
    },

    // ✅ Social links
    socialLinks: {
        github: { type: String, default: "" },
        linkedin: { type: String, default: "" },
        instagram: { type: String, default: "" },
    },
}, {
    timestamps: true,
})

const userProfile = mongoose.model("UserProfile", userProfileSchema);
export default userProfile;