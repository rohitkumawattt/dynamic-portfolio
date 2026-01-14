import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema({
    resume: {
        type: String,
        required: true,
    },
    cloudinaryUrl: {
        type: String,
        required: true
    },
    cloudinaryId: {
        type: String,
        required: true
    },
},
    {
        timestamps: true,
    }
);

const resume = mongoose.model("Resume", resumeSchema);
export default resume;
