"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const router = express_1.default.Router();
router.route("/create").post(userController_1.createUser);
router.route("/update/:id").put(userController_1.updateUser);
router.route("/user/:id").get(userController_1.getUser);
router.route("/user/:id").delete(userController_1.deleteUser);
router.route("/users").get(userController_1.getAllUsers);
exports.default = router;
