"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.respond = void 0;
const respond = (res, code, status, message, data) => {
    if (code === 200 || code === 201) {
        return res
            .status(code)
            .json({ status: status, message: message, data: data || [] });
    }
    else {
        return res.status(code).json({ status: status, error: message });
    }
};
exports.respond = respond;
