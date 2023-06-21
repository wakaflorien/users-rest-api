import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcryptjs";
import {
  createUserValidate,
  updateUserValidate,
} from "../validation/userSchemaValidation";
import { respond } from "../helpers/responses";

export const createUser = async (req: Request, res: Response) => {
  try {
    const {
      firstname,
      lastname,
      gender,
      location,
      education,
      study,
      password,
      email,
    } = req.body;
    const { error } = createUserValidate({
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

    const findUser = await User.findOne({ email });
    if (findUser) {
      return res
        .status(409)
        .json({ status: "fail", error: "User already exists" });
    }
    const hashedPwd = await bcrypt.hash(password, 10);

    await User.create({
      firstname: firstname,
      lastname: lastname,
      gender: gender,
      education: education,
      study: study,
      location: location,
      password: hashedPwd,
      email: email,
    });
    res
      .status(201)
      .json({ status: "success", data: { User: `${email} created` } });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error);
      res.status(500).json({ status: "fail", error: error.message });
    } else {
      console.error(error);
      res.status(500).json({ status: "fail", error: "Unknown error" });
    }
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const {
      firstname,
      lastname,
      gender,
      location,
      education,
      study,
      password,
      email,
    } = req.body;
    const { error } = updateUserValidate({
      firstname,
      lastname,
      gender,
      location,
      education,
      study,
      password,
      email,
    });

    if (error) respond(res, 400, "fail", error.details[0].message);

    const user = await User.findById(id);

    if (!user) {
      respond(res, 404, "fail", "user not found");
    } else {
      if (email) user.email = email;
      if (firstname) user.firstname = firstname;
      if (lastname) user.lastname = lastname;
      if (gender) user.gender = gender;
      if (location) user.location = location;
      if (education) user.education = education;
      if (study) user.study = study;
      if (password) user.password = password;

      await user.save();

      res.status(200).json({ status: "success", message: "User updated " });
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      respond(res, 500, "fail", error.message);
    } else {
      console.error(error);
      respond(res, 500, "fail", "Unknown error");
    }
  }
};

export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);

    if (!user) respond(res, 404, "fail", "User not found");

    respond(res, 200, "success", "User found", user);
  } catch (error: unknown) {
    if (error instanceof Error) {
      respond(res, 500, "fail", error.message);
    } else {
      console.error(error);
      respond(res, 500, "fail", "Unknown error");
    }
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      respond(res, 404, "fail", "User not found");
    } else {
      respond(res, 204, "success", "User deleted");
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      respond(res, 500, "fail", error.message);
    } else {
      console.error(error);
      respond(res, 500, "fail", "Unknown error");
    }
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();

    if (!users.length) respond(res, 200, "success", "No users found", []);

    respond(res, 200, "success", "All Users", users);
  } catch (error: unknown) {
    if (error instanceof Error) {
      respond(res, 500, "fail", error.message);
    } else {
      console.error(error);
      respond(res, 500, "fail", "Unknown error");
    }
  }
};
