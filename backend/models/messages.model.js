import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
    },
    message:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        default:"unread"
    },
},{
    timestamps: true,
})

const message = mongoose.model("Message", messageSchema);
export default message;