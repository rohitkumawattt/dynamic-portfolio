import Message from "../models/messages.model.js";

export const addMessage = async (req, res) => {
    try {
        const { name, email, message } = req.body;
        const newMessage = new Message({
            name,
            email,
            message,
        })
        await newMessage.save();
        res.status(200).json({
            success: true,
            message: "Message sent successfully",
            newMessage,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        })
    }
}

// gets all messages


export const getMessages = async (req, res) =>{
    try {
        const messages = await Message.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            message: "Messages fetched successfully",
            messages:messages,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        })
    }
}
// get message by slug

export const getMessageById = async (req, res) =>{
    try {
        const { slug } = req.params;
        if(!slug){
            return res.status(400).json({
                success:false,
                message:"Please provide feedback slug."
            })
        }
        const searchRegex = new RegExp(slug, 'i');
        const messages = await Message.find({
            $or: [
                { name: searchRegex },
                { email: searchRegex },
                { message: searchRegex }
            ]
        }).sort({ createdAt: -1 });
        if(messages.length === 0){
            return res.status(404).json({
                success: false,
                message: "Message not found",
            })
        }
        res.status(200).json({
            success: true,
            message: "Message fetched successfully",
            messages:messages,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        })
    }
}