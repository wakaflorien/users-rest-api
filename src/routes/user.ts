import express from "express";
import { createUser, deleteUser, getAllUsers, getUser, updateUser } from "../controllers/userController";

const router = express.Router();

router.route("/create").post(createUser);
router.route("/update/:id").put(updateUser);
router.route("/user/:id").get(getUser);
router.route("/user/:id").delete(deleteUser);
router.route("/users").get(getAllUsers);

export default router;
