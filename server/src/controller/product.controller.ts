import { NextFunction, Request, Response } from "express";
import data from "../product.json";
import sliding_products from "../products2.json";

export const product = (req: Request, res: Response, next: NextFunction) => {
  try {
    return res.status(201).json({ success: true, data, sliding_products });
  } catch (err: any) {
    next(err);
  }
};
