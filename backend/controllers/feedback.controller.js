import feedback from "../models/feedback.model.js";

//get feedback
export const getFeedback = async (req, res) => {
  try {
    const feedbacks = await feedback.find().sort({ createdAt: -1 });
    if(feedbacks === 0){
        return res.status(400).json({
            success:false,
            message:"Feedbacks not found."
        })
    }
    res.status(200).json({
      success: true,
      message: "Feedback fetched successfully",
      feedbacks: feedbacks,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// create feedback
export const createFeedback = async (req, res) => {
    try {
        const {name, message, rating} = req.body;
        if(!name || !message || !rating){
            return res.status(400).json({
                success:false,
                message:"Please fill all the fields."
            })
        }
        const newFeedback = new feedback({
            name,
            message,
            rating
        });
        await newFeedback.save();
        res.status(201).json({
            success:true,
            message:"Feedback created successfully",
            feedback:newFeedback
        })
    } catch (error) {
        res.status(500).json({success:false, message: error.message });
    }
}

// delete feedback
export const deleteFeedback = async (req, res) => {
    try {
        const {id} = req.params;
        if(!id){
            return res.status(400).json({
                success:false,
                message:"Please provide feedback id."
            })
        }
        await feedback.findByIdAndDelete(id);
        res.status(200).json({
            success:true,
            message:"Feedback deleted successfully"
        })
    } catch (error) {
        res.status(500).json({success:false, message: error.message });
    }
}

// search feedback by slug
export const searchFeedback = async (req, res) => {
    try {
        const {slug} = req.params;
        if(!slug){
            return res.status(400).json({
                success:false,
                message:"Please provide feedback slug."
            })
        }
        const searchRegex = new RegExp(slug,"i");
        const feedbacks = await feedback.find({
            $or: [
                { name: searchRegex },
                { message: searchRegex }
            ]
        }).sort({ createdAt: -1 });
        if(feedbacks.length === 0){
            return res.status(404).json({
                success: false,
                message: "Feedback not found",
            })
        }
        res.status(200).json({
            success: true,
            message: "Feedback fetched successfully",
            feedbacks:feedbacks,
        })
    } catch (error) {
        res.status(500).json({success:false, message: error.message });
    }
}
