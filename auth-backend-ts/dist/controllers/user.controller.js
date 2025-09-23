"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = exports.register = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_model_1 = __importDefault(require("../models/user.model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createToken = (id) => {
    return jsonwebtoken_1.default.sign({ id }, process.env.SECRET, { expiresIn: "7d" });
};
const register = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        if (!name || !email || !password) {
            res.status(400).json({ success: false, message: "All fields required" });
            return;
        }
        const existingUser = await user_model_1.default.findOne({ email });
        if (existingUser) {
            res.status(400).json({ success: false, message: "User already exist" });
        }
        const hashedPassword = await bcrypt_1.default.hash(password, 8);
        const newUser = await user_model_1.default.create({
            name,
            email,
            password: hashedPassword,
        });
        res.status(201).json({
            success: true,
            message: "Registration Successful",
            data: newUser,
        });
    }
    catch (error) {
        const err = error;
        res.status(500).json({
            success: false,
            message: "User Registration failed ",
            error: err,
        });
    }
};
exports.register = register;
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            res.status(400).json({ success: false, message: "All fields required" });
            return;
        }
        const user = await user_model_1.default.findOne({ email });
        if (!user) {
            res.status(400).json({ success: false, message: "User not exist" });
            return;
        }
        const matchedPassword = await bcrypt_1.default.compare(password, user.password);
        if (!matchedPassword) {
            res
                .status(400)
                .json({ success: false, message: "Password is incorrect" });
            return;
        }
        const token = createToken(user._id.toString());
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        res.status(201).json({
            success: true,
            message: "loggedIn Successful",
            data: user,
            token: token,
        });
    }
    catch (error) {
        const err = error;
        res.status(500).json({
            success: false,
            message: "User login failed ",
            error: err,
        });
    }
};
exports.login = login;
const logout = async (req, res) => {
    try {
        res.clearCookie("token", {
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        res.status(200).json({ success: true, message: "logout Successfully" });
    }
    catch (error) {
        const err = error;
        res.status(500).json({
            success: false,
            message: "User Registration failed ",
            error: err,
        });
    }
};
exports.logout = logout;
//# sourceMappingURL=user.controller.js.map