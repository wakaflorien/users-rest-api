"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: false,
    },
    education: {
        type: String,
        required: false,
    },
    study: {
        type: String,
        required: false,
    },
    roles: {
        User: {
            type: Number,
            default: 1,
        },
        Admin: {
            type: Number,
            default: 0,
        },
    },
    password: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    is_active: {
        type: Boolean,
        default: true,
    },
});
const User = mongoose_1.default.model('User', userSchema);
exports.default = User;
