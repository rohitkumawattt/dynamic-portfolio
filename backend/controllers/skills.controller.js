import Skill from "../models/skills.model.js";  


export const createSkills = async (req, res) => {
    try {
        const {name,category,proficiency} = req.body;
        if(!name || !category || !proficiency){
            return res.status(400).json({
                success:false,
                message:"Please fill all the fields"
            })
        }
        const user = req.user;
        const newSkill = new Skill({
            user,
            name,
            category,
            proficiency
        })
        await newSkill.save();
        res.status(200).json({
            success:true,
            message:"Skill created successfully",
            skill:newSkill
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Internal server error",
            error:error.message
        })
    }
}

export const getSkills = async (req, res) => {
    try {
        const skills = await Skill.find({});
        if(skills.length === 0){ 
            return res.status(200).json({ 
                success:true,
                message:"No skills found",
                skills: []
            })
        }
        res.status(200).json({
            success:true,
            message:"Skills fetched successfully",
            skills:skills.map(skill => ({
                ...skill._doc,
                user:undefined
            }))
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Internal server error",
            error:error.message
        })
    }
}

export const deleteSkills = async (req, res) => {
    try {
        const {id} = req.params;
        const deletedSkill = await Skill.findByIdAndDelete(id);
        if(!deletedSkill){
            return res.status(400).json({
                success:false,
                message:"Skill not found"
            })
        }
        res.status(200).json({
            success:true,
            message:"Skill deleted successfully",
            skill:deletedSkill
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Internal server error",
            error:error.message
        })
    }
}