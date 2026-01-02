import { NextFunction, Request, Response } from "express";
import { users_details } from "../data";

const user = async (req: Request, res: Response, next: NextFunction) => {
  const { userId, id }: any = req.user;
  try {
    const user = users_details.find((user) => user._id === userId);

    return res.status(201).json({ message: "Active", success: true, user });
  } catch (err: any) {
    next(err);
  }
};
export default user;
