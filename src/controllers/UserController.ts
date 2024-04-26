import { Router, Request, Response, response } from "express";
import { userModel } from "../models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import transporter from "../config/nodemailer"

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
        const sendMails = await transporter.sendMail({
          from: "ngabosevelin@gmail.com",
          to: email,
          replyTo: "ngabosevelin@gmail.com",
          subject: "Account created",
          html: `
          <div style="max-width: 600px; margin: 20px auto; padding: 20px; background-color: #f9f9f9; border-radius: 5px; font-family: Arial, sans-serif; line-height: 1.6;">
    <h2 style="color: #333;">Hello ${responseData.username},</h2>
    <p style="margin-bottom: 10px;">Your admin account has been successfully created for My_Brand. Below are your login credentials:</p>
    <ul style="list-style-type: none; padding: 0;">
      <li style="margin-bottom: 10px;"><strong>Email:</strong> ${responseData.email}</li>
      <li style="margin-bottom: 10px;"><strong>Password:</strong> ${password}</li>
    </ul>
    <p><a href="https://sevelin-portfolio.netlify.app/admin/signin" target='_blank'>Login now</a></p>
    <p style="margin-bottom: 10px;">Please use these credentials to log in to your account. Upon logging in, it's recommended to change your password immediately for security reasons.</p>
    <p style="margin-bottom: 10px;">If you have any questions or need further assistance, feel free to contact us at ngabosevelin@gmail.com.</p>
    <p>Best regards,<br>My_Brand</p>
  </div>
          
          `,
        });
        if (sendMails) {
          res.status(201).json({
            success: true,
            message: "User Created Successfully",
            user: responseData,
          });
        }
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
