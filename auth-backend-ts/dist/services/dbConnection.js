"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConnection = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const MONGODB_URL = process.env.MONGODB_URL;
const dbConnection = async () => {
    try {
        const dbInstance = await mongoose_1.default.connect(MONGODB_URL);
        console.log(`Database connected to host ${dbInstance.connection.host}`);
    }
    catch (error) {
        const err = error;
        console.log(`something is went wrong while connecting to db`, err);
    }
};
exports.dbConnection = dbConnection;
//# sourceMappingURL=dbConnection.js.map