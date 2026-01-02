import { Request, Response, Router } from "express";
import { login } from "../controller/login.controller";
import { token_verify } from "../middleware/token_verify.middleware";
import user from "../controller/user.controller";
import { product } from "../controller/product.controller";
import { product_details } from "../controller/product_details.controller";

 const router = Router();

router.get("/", async (req: Request, res: Response) => {
  return res.status(200).json("Hello Tue Tue ");
});
router.post("/login", login);

// veerify token
router.get("/user", token_verify, user);

router.get('/products', product)

router.get('/products/:id', product_details)


export default router