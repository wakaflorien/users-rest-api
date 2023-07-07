"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    gender: { type: String, required: true },
    location: { type: String, required: true },
    education: { type: String, required: true },
    study: { type: String, required: true },
    roles: {
        User: { type: Number, default: 1 },
        Admin: { type: Number, default: 0 },
    },
    password: { type: String, required: true, select: true },
    refreshToken: { type: String, select: false },
    created_at: { type: Date, required: false },
    _active: { type: Boolean, required: false },
});
const User = mongoose_1.default.model("User", userSchema);
exports.default = User;
