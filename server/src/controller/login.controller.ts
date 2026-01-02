import { NextFunction, Request, Response } from "express";
import { users_details } from "../data";
import { v4 } from "uuid";
import jwt from "jsonwebtoken";

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res
      .status(403)
      .json({ success: false, message: "Please fill the forms" });
  try {
    const user = users_details.find(
      (user) => user.email === email && user.password === password
    );
    if (user) {
      const id = v4();
      if (!process.env.JWT) throw new Error("JWT not defined");
      const token = jwt.sign(
        { id, userId: user._id },
        process.env.JWT as string,
        {
          expiresIn: "122d",
        }
      );
      return res
        .status(201)
        .json({ success: true, token, message: "Login Successful" });
    }

    return res
      .status(401)
      .json({ success: false, message: "Invalid Credentials" });
  } catch (err: any) {
    next(err);
  }
};
