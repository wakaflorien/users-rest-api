"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.getAllUsers = exports.deleteUser = exports.getUser = exports.updateUser = exports.createUser = void 0;
const User_1 = __importDefault(require("../models/User"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userSchemaValidation_1 = require("../validation/userSchemaValidation");
const responses_1 = require("../helpers/responses");
const sendEmail_1 = require("../helpers/sendEmail");
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstname, lastname, gender, location, education, study, password, email, } = req.body;
        const { error } = (0, userSchemaValidation_1.createUserValidate)({
            firstname,
            lastname,
            gender,
            location,
            education,
            study,
            password,
            email,
        });
        if (error) {
            return res.status(400).json({
                status: "fail",
                error: error.details[0].message,
            });
        }
        const findUser = yield User_1.default.findOne({ email });
        if (findUser) {
            return res
                .status(409)
                .json({ status: "fail", error: "User already exists" });
        }
        const hashedPwd = yield bcryptjs_1.default.hash(password, 10);
        const user = yield User_1.default.create({
            firstname: firstname,
            lastname: lastname,
            gender: gender,
            education: education,
            study: study,
            location: location,
            password: hashedPwd,
            email: email,
        });
        if (user) {
            (0, sendEmail_1.sendEmail)(user.email, "Welcome to the app", "Account created successfully you can now login to the app");
            res
                .status(201)
                .json({ status: "success", data: { User: `${email} created` } });
        }
    }
    catch (error) {
        if (error instanceof Error) {
            console.log(error);
            res.status(500).json({ status: "fail", error: error.message });
        }
        else {
            console.error(error);
            res.status(500).json({ status: "fail", error: "Unknown error" });
        }
    }
});
exports.createUser = createUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const { firstname, lastname, gender, location, education, study, password, email, } = req.body;
        const user = yield User_1.default.findById(id);
        if (!user) {
            (0, responses_1.respond)(res, 404, "fail", "user not found");
        }
        else {
            if (email)
                user.email = email;
            if (firstname)
                user.firstname = firstname;
            if (lastname)
                user.lastname = lastname;
            if (gender)
                user.gender = gender;
            if (location)
                user.location = location;
            if (education)
                user.education = education;
            if (study)
                user.study = study;
            if (password)
                user.password = password;
            yield user.save();
            res.status(200).json({ status: "success", message: "User updated " });
        }
    }
    catch (error) {
        if (error instanceof Error) {
            (0, responses_1.respond)(res, 500, "fail", error.message);
        }
        else {
            console.error(error);
            (0, responses_1.respond)(res, 500, "fail", "Unknown error");
        }
    }
});
exports.updateUser = updateUser;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield User_1.default.findById(id);
        if (!user)
            (0, responses_1.respond)(res, 404, "fail", "User not found");
        (0, responses_1.respond)(res, 200, "success", "User found", user);
    }
    catch (error) {
        if (error instanceof Error) {
            (0, responses_1.respond)(res, 500, "fail", error.message);
        }
        else {
            console.error(error);
            (0, responses_1.respond)(res, 500, "fail", "Unknown error");
        }
    }
});
exports.getUser = getUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield User_1.default.findByIdAndDelete(id);
        if (!user) {
            (0, responses_1.respond)(res, 404, "fail", "User not found");
        }
        else {
            (0, responses_1.respond)(res, 204, "success", "User deleted");
        }
    }
    catch (error) {
        if (error instanceof Error) {
            (0, responses_1.respond)(res, 500, "fail", error.message);
        }
        else {
            console.error(error);
            (0, responses_1.respond)(res, 500, "fail", "Unknown error");
        }
    }
});
exports.deleteUser = deleteUser;
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_1.default.find();
        if (!users.length) {
            (0, responses_1.respond)(res, 200, "success", "No users found", []);
        }
        else {
            (0, responses_1.respond)(res, 200, "success", "All Users", users);
        }
    }
    catch (error) {
        if (error instanceof Error) {
            (0, responses_1.respond)(res, 500, "fail", error.message);
        }
        else {
            console.error(error);
            (0, responses_1.respond)(res, 500, "fail", "Unknown error");
        }
    }
});
exports.getAllUsers = getAllUsers;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            (0, responses_1.respond)(res, 400, "fail", "Please provide email and password");
        }
        const user = yield User_1.default.findOne({ email });
        if (!user) {
            (0, responses_1.respond)(res, 404, "fail", "User not found");
        }
        const isMatch = yield bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            (0, responses_1.respond)(res, 400, "fail", "Incorrect email or password");
        }
        const roles = user.roles;
        const accessToken = jsonwebtoken_1.default.sign({
            userId: user._id,
            email: user.email,
            roles: roles,
        }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1h" });
        const refreshToken = jsonwebtoken_1.default.sign({
            email: user.email,
        }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "1d" });
        user.refreshToken = refreshToken;
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
        });
        (0, responses_1.respond)(res, 200, "success", "User logged in successfully", {
            accessToken: accessToken,
        });
    }
    catch (error) {
        if (error instanceof Error) {
            (0, responses_1.respond)(res, 500, "fail", error.message);
        }
        else {
            console.error(error);
            (0, responses_1.respond)(res, 500, "fail", "Unknown error");
        }
    }
});
exports.loginUser = loginUser;
