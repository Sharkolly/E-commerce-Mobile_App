import { NextFunction, Request, Response } from "express";
import sliding_products from "../products2.json";
import data from "../product.json";

export const product_details = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  try {
    let product: any;
    if (id) {
      product = sliding_products.products.find((product) => product.id === id);
      if (!product) {
        product = data.products.find((product) => product.id === parseInt(id));
      }

      if (product == undefined || product === null)
        return res.status(404).json({ success: false });
      return res.status(201).json({ success: true, product });
    }
  } catch (err: any) {
    next(err);
  }
};
