import { Router, Request, Response, response } from "express";
import { userModel } from "../models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req: Request, res: Response) => {
  const { email, username, password } = req.body;
  try {
    if (email !== "" && username !== "" && password !== "") {
      const hashedPassword = bcrypt.hashSync(password, 10);
      const userToSave = new userModel({
        username: username,
        email: email,
        password: hashedPassword,
      });
      await userToSave.save();
      const { password: _, ...responseData } = userToSave.toObject();
      res.status(201).json({
        success: true,
        message: "User Created Successfully",
        user: responseData,
      });
    }
  } catch (error: any) {
    res.json({ message: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const existUser = await userModel.findOne({ email: email });
    if (existUser) {
      const comparePassword = bcrypt.compareSync(password, existUser.password);
      if (comparePassword) {
        const { password: _, ...responseUser } = existUser.toObject();
        const secret: any = process.env.JWT_SECRET;
        const token = jwt.sign({ user: responseUser }, secret, {
          expiresIn: "10d",
        });
        const refreshSecret: any = process.env.JWT_REFRESH_SECRET;
        const refreshToken = jwt.sign({ user: responseUser }, refreshSecret, {
          expiresIn: "10d",
        });
        res
          .status(200)
          .json({
            user: responseUser,
            token: token,
            refreshToken: refreshToken,
          });
      } else {
        res.status(401).json({ message: "Invalid email or password" });
      }
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error: any) {
    res.status(500).json({ message: error });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const user: any = (req as any).user.user;
    const updateInfo = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    };
    const updateUserProfile = await userModel.findByIdAndUpdate(
      user._id,
      updateInfo,
      { new: true }
    );
    if (updateUserProfile) {
      res.status(200).json({ message: "User Updated successfully" });
    } else {
      res.status(404).json({ message: "Sorry no user found" });
    }
  } catch (error: any) {
    res.status(500).json({ messsage: error.message });
  }
};

export const userInformation = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user.user;
    const userId = user._id;
    const finddUser = await userModel.findById(userId);
    if (finddUser) {
      res.status(200).json({ message: "success", user: finddUser });
    } else {
      res.status(404).json({ message: "no user found" });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const usersAccount = async (req: Request, res: Response) => {
  try {
    const usersAccount = await userModel.find().sort({ _id: -1 });
    if (usersAccount.length > 0) {
      res.status(200).json({ users: usersAccount });
    } else {
      res.status(404).json("no user found");
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
