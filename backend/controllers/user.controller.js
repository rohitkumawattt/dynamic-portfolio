import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import transporter from "../config/nodemailer.js";
import { EMAIL_VERIFY_TEMPLATE, PASSWORD_RESET_TEMPLATE } from "../config/emailTemplates.js";


// user registration    
export const register = async (req, res) => {
    try {
        const { fullName, email, password, confirmPassword } = req.body;
        const existingUser = await userModel.findOne({ email });
        if(!fullName || !email || !password || !confirmPassword){
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists",
                User: {
                    fullName,
                    email
                }
            })
        }
        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Passwords do not match",
                password: password,
                confirmPassword: confirmPassword
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new userModel({
            name:fullName,
            email,
            password: hashedPassword
        })
        await newUser.save();
        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            NewUserCreate: {
                email,
                fullName,
            }
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        })
    }
}

// user login

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if(!email || !password){
            return res.status(400).json({
                success: false,
                message: "All fields are required"  
            })
        }
        const userLogin = await userModel.findOne({ email });
        if (!userLogin) {
            return res.status(400).json({
                success: false,
                message: "User not found",
                email
            })
        }
        const isPasswordValid = await bcrypt.compare(password, userLogin.password);
        if (!isPasswordValid) {
            return res.status(400).json({
                success: false,
                message: "Invalid password",
                password
            })
        }
        const accessToken = jwt.sign({ userId: userLogin._id }, process.env.JWT_ACCESS_SECREAT, { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN });
        const refreshToken = jwt.sign({ userId: userLogin._id }, process.env.JWT_REFRESH_SECREAT, { expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN });

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true, // true in production (https)
            sameSite: "None",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return res.status(200).json({
            success: true,
            message: "User logged in successfully",
            accessToken,
            refreshToken,
            user: {
                id: userLogin._id,
                fullName: userLogin.name,
                email: userLogin.email
            }
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        })
    }
}

// referesh access token controller

export const refereshAccessToken = async (req, res) => {
    const refereshToken = req.cookies.refreshToken;
    if (!refereshToken) {
        return res.status(400).json({
            success: false,
            message: "Referesh token not found" 
        })
    }

    try {
        const decoded = jwt.verify(refereshToken, process.env.JWT_REFRESH_SECREAT);
        const accessToken = jwt.sign({ userId: decoded.userId }, process.env.JWT_ACCESS_SECREAT, { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN });
        return res.status(200).json({
            success: true,
            message: "Access token refreshed successfully",
            accessToken
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "Invalid referesh token",
            error: error.message
        })
    }
}
 // send otp to user's email
export const sendVerifyOtp = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await userModel.findById(userId);
        // console.log("user from send vcerify oto:",user)
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found. Invalid token.",
            });
        }
        if (user.isAccountVerified) {
            return res.status(200).json({
                success: false,
                message: "Account already verified",
            })
        }
        const otp = String(Math.floor(100000 + Math.random() * 900000));
        user.verifyOtp = otp;
        user.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000;
        await user.save();

        const mailOption = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: "Account Verification OTP",
            // text: `Your OTP is ${otp}. Verify your account using this OTP.`,
            html:EMAIL_VERIFY_TEMPLATE.replace("{{otp}}",otp).replace("{{email}}",user.email),
        }
        await transporter.sendMail(mailOption);
        return res.status(200).json({
            success: true,
            message: "Verification OTP sent to your email",
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error in sendVerifyOtp",
            error:error.message,
        })
    }

}

// verification of email 
export const VerifyEmail = async (req, res) => {
    const userId = req.user.id;
    const { otp } = req.body;
    if (!userId || !otp) {
        return res.status(400).json({
            success: false,
            message: "Missing Details"
        })
    }
    try {
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found",
            })
        }
        if (user.verifyOtp === "" || user.verifyOtp !== otp) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP",
            })
        }
        if (user.verifyOtpExpireAt < Date.now()) {
            return res.status(400).json({
                success: false,
                message: "OTP expired",
            })
        }
        user.isAccountVerified = true;
        user.verifyOtp = '';
        user.verifyOtpExpireAt = 0;
        await user.save();
        return res.status(200).json({
            success: true,
            message: "Email verified successfully",
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

// check id user is Authenticated
export const isAuthenticated = async (req, res) => {
    try {
        return res.status(200).json({
            success: true,
            message: "User is authenticated",
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

// send password reset OTP
export const sendResetOtp = async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({
            success: false,
            message: "Missing email",
        })
    }
    try {
        const user = await userModel.findOne({email});
        if(!user){
            return res.status(404).json({
                success: false,
                message: "User not found",
            })
        }
        const otp = String(Math.floor(100000 + Math.random() * 900000));
        user.resetOtp = otp;
        user.resetOtpExpireAt = Date.now() + 15 * 60 * 1000;
        await user.save();

        const mailOption = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: "Password Reset OTP",
            // text: `Your OTP is ${otp} for resetting your password.`,
            html:PASSWORD_RESET_TEMPLATE.replace("{{otp}}",otp).replace("{{email}}",user.email),
        }
        await transporter.sendMail(mailOption);
        return res.status(200).json({
            success: true,
            message: "OTP sent to your email",
        })

    } catch (error) {
        console.log("Error in sendResetOtp : ",error)
        return res.status(500).json({
            success: false,
            message: error.message,
            error:error
        })
    }
}

// reset user password 
export const resetPassword = async (req, res) => {
    const { email, otp, newPassword } = req.body;
    if (!email || !otp || !newPassword) {
        return res.status(400).json({
            success: false,
            message: "email, otp, new password are required",
        })
    }
    try {
        const user = await userModel.findOne({email});
        if(!user){
            return res.status(404).json({
                success: false,
                message: "User not found",
            })
        }
        if(user.resetOtp !== otp || user.resetOtp === ""){
            return res.status(400).json({
                success: false,
                message: "Invalid OTP",
            })
        }
        if(user.resetOtpExpireAt < Date.now()){
            return res.status(400).json({
                success: false,
                message: "OTP expired",
            })
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.resetOtp = "";
        user.resetOtpExpireAt = 0;
        await user.save();
        return res.status(200).json({
            success: true,
            message: "Password has been reset successfully",
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}









// user getMe

export const getMe = async (req, res) => {
    res.json(req.user);
}