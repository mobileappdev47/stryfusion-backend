const generateToken = require("../config/jwtToken");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const generateRefreshToken = require("../config/refreshToken");
const bcrypt = require('bcrypt')


// create user
const createUser = asyncHandler(async (req, res) => {
    try {
        const email = req.body.email;
        const findUser = await User.findOne({ email: email });

        if (!findUser) {
            const newUser = await User.create(req.body);
            res.status(200).json({ success: true, code: 200, user: newUser }); // Added success flag and user object
        } else {
            res.status(400).json({ success: false, code: 400, message: 'User with this email already exists' }); // Added success flag and error message
        }
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ success: false, code: 500, message: 'Internal Server Error' }); // Added success flag and error message
    }
});


// Login a user
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    try {
        // check if user exists or not
        const findUser = await User.findOne({ email });
        // If user is not found
        if (!findUser) {
            return res.status(401).json({
                success: false,
                code: 401,
                message: "Invalid credentials",
            });
        }

        if (await findUser.isPasswordMatched(password)) {
            const refreshToken = await generateRefreshToken(findUser?._id);
            const updateuser = await User.findByIdAndUpdate(
                findUser.id,
                {
                    refreshToken: refreshToken,
                },
                { new: true }
            );
            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                maxAge: 72 * 60 * 60 * 1000,
            });
            res.json({
                success: true,
                code: 200,
                data: {
                    _id: findUser?._id,
                    firstname: findUser?.firstname,
                    lastname: findUser?.lastname,
                    email: findUser?.email,
                    token: generateToken(findUser?._id),
                },
            });

        } else {
            return res.status(401).json({
                success: false,
                code: 401,
                message: "Invalid credentials",
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            code: 500,
            message: "Internal server error",
        });
    }
});

// forgot password 
const sendOtp = asyncHandler(async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });

    // Check if the user with the provided email exists
    if (!user) {
        return res.status(404).json({
            success: false,
            code: 404,
            message: 'User not found with this email',
        });
    }

    try {
        // Generate a secure 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000);

        // Save the securely hashed OTP in the user document
        const hashedOTP = await bcrypt.hash(otp.toString(), 10);
        user.passwordResetOTP = hashedOTP;
        await user.save();

        // Construct the email content with a user-friendly message
        const data = {
            to: email,
            text: `Hello ${user.firstname},\n\nYour OTP for password reset is: ${otp}\n\nThank you.`,
            subject: 'Forgot Password OTP',
        };

        // Import the sendEmail function from the file where you have defined it
        const sendEmail = require('../utils/email');
        sendEmail(data);

        // Return user details in the response
        res.json({
            success: true,
            code: 200,
            message: 'OTP sent successfully',
            user: {
                _id: user._id,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
            },
        });
    } catch (error) {
        console.error('Error in sendOtp:', error);
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                success: false,
                code: 400,
                message: 'Validation error',
                errors: error.errors,
            });
        } else {
            res.status(500).json({
                success: false,
                code: 500,
                message: 'Internal Server Error',
                error: error.message,
            });
        }
    }
});


// verify otp
const verifyOtp = asyncHandler(async (req, res) => {
    const { otp } = req.body;
    const userId = req.params.userId;

    const user = await User.findById(userId);
    if (!user) {
        throw new Error(" User not found");
    }

    try {
        // Compare the provided OTP with the hashed OTP in the user document
        const isMatch = await bcrypt.compare(otp.toString(), user.passwordResetOTP);
        if (!isMatch) {
            throw new Error("Invalid OTP");
        }
        res.json({
            success: true,
            code: 200,
            message: "OTP verified successfully",
        });
    } catch (error) {
        console.error('Error in verifyOtp:', error);
        res.status(500).json({
            success: false,
            code: 500,
            message: "Internal Server Error",
            error: error.message,
        });
    }
});


// reset password
const updatePassword = asyncHandler(async (req, res) => {
    const { userId } = req.params;
    if (!userId) {
        return res.status(400).json({ success: false, code: 400, error: 'User ID is required' });
    }
    try {
        // Check if a new password is provided
        if (!req.body.password) {
            return res.status(400).json({ success: false, code: 400, error: 'Password is required' });
        }

        const salt = await bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                $set: {
                    password: hashedPassword,
                },
            },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ success: false, code: 404, error: 'User not found' });
        }

        res.status(200).json({ success: true, code: 200, data: updatedUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, code: 500, error: 'Internal Server Error' });
    }
});





module.exports = { createUser, loginUser, sendOtp, verifyOtp, updatePassword }