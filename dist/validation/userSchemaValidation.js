"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserValidate = exports.createUserValidate = void 0;
const joi_1 = __importDefault(require("joi"));
const createUserValidate = (data) => {
    const schema = joi_1.default.object().keys({
        firstname: joi_1.default.string().required(),
        lastname: joi_1.default.string().required(),
        email: joi_1.default.string().email().required(),
        password: joi_1.default.string().required(),
        gender: joi_1.default.string().required(),
        location: joi_1.default.string(),
        education: joi_1.default.string(),
        study: joi_1.default.string(),
    });
    const value = schema.validate(data, { abortEarly: false });
    return value;
};
exports.createUserValidate = createUserValidate;
const updateUserValidate = (data) => {
    const schema = joi_1.default.object().keys({
        firstname: joi_1.default.string(),
        lastname: joi_1.default.string(),
        email: joi_1.default.string().email(),
        password: joi_1.default.string(),
        gender: joi_1.default.string(),
        location: joi_1.default,
        education: joi_1.default,
        study: joi_1.default.string(),
    });
    const value = schema.validate(data, { abortEarly: false });
    return value;
};
exports.updateUserValidate = updateUserValidate;
