const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken")


exports.login = async (req, res) => {

    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRE }
        );

        res.json({
            message: "Login successful",
            token,
            user
        });
    } catch (error) {
        res.json({
            message: "Login successful",
            token
        });
    }
}

exports.register = async (req, res) => {
    try {
        let { userName, email, password, role, confirmPassword, parent_mobile } = req.body;

        if (!userName || !email || !password) {
            return res.status(400).json({ message: "All fields are required!" })
        }

        if (password !== confirmPassword) {
            return res
                .status(400)
                .json({ message: "Password and confirm password do not match" });
        }

        if (password.length < 6) {
            return res
                .status(400)
                .json({ message: "Password must be at least 6 characters long" });
        }

        let parentMobile = "";

        if (role && role.trim().toLowerCase() === "parent" && parent_mobile) {
            const mobileRegex = /^[0-9]{10}$/;

            if (!mobileRegex.test(parent_mobile)) {
                return res
                    .status(400)
                    .json({ message: "Please enter a valid 10-digit mobile number" });
            }

            parentMobile = parent_mobile;
        }

        const existingUser = await User.findOne({
            $or: [{ email }, { userName }]
        });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists with this email or username" })
        }
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            userName,
            email,
            password: hashedPassword,
            role,
            parentMobile
        });

        await newUser.save();
        res.status(201).json({
            message: "User created successfully",
            user: {
                id: newUser._id,
                userName: newUser.userName,
                email: newUser.email,
                role: newUser.role,
                staus: newUser.status,
                parentMobile: newUser.parentMobile,
                createdAt: newUser.createdAt
            }
        });
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

exports.getTeachers = async (req, res) => {
    try {
        const teachers = await User.find({ status: 1, role: "teacher" });
        return res.status(200).json({
            message: "Success!",
            count: teachers.length,
            teachers
        })
    } catch (error) {
        console.error("Error fetching teachers:", error);
        return res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
}

exports.getProfile = async (req, res) => {
    try {
        const users = await User.find({ status: 1 });
        return res.status(200).json({
            message: "Active users fetched successfully",
            count: users.length,
            users
        });

    } catch (error) {
        console.error("Error fetching profile:", error);
        return res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};

