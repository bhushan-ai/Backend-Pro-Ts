"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = __importDefault(require("../models/user.model"));
const jwtAuth = async (req, res, next) => {
    const token = req.cookies.token;
    try {
        if (!token) {
            res.status(400).json({ success: false, message: "User not Valid" });
        }
        const decodeToken = jsonwebtoken_1.default.verify(token, process.env.SECRET);
        const user = await user_model_1.default.findById(decodeToken.id).select("-password");
        if (!user) {
            res.status(401).json({ success: false, message: "User not found" });
            return;
        }
        req.user = user;
        next();
    }
    catch (error) {
        const err = error;
        res.status(500).json({
            success: false,
            message: ` "Authentication failed",`,
            error: err.message,
        });
    }
};
exports.jwtAuth = jwtAuth;
//# sourceMappingURL=auth.js.map