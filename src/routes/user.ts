import express from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUser,
  loginUser,
  updateUser,
} from "../controllers/userController";

const router = express.Router();

router.route("/auth/register").post(createUser);
router.route("/update/:id").put(updateUser);
router.route("/user/:id").get(getUser);
router.route("/user/:id").delete(deleteUser);
router.route("/users").get(getAllUsers);
router.route("/auth/login").post(loginUser);

export default router;
