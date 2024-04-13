import { Router, Request, Response } from "express";
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
          expiresIn: "10s",
        });
        const refreshSecret: any = process.env.JWT_REFRESH_SECRET;
        const refreshToken = jwt.sign({user:responseUser}, refreshSecret, {expiresIn: "10d"})
        res.json({ user: responseUser,token:token,refreshToken:refreshToken });
      } else {
        res.json({ message: "Invalid email or password" });
      }
    } else {
      res.json({ message: "Invalid email or password" });
    }
  } catch (error: any) {
    res.json({ message: error });
  }
};
