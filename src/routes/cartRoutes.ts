import express from "express";
import {
  addToCart,
  getCart,
  updateCartItem,
} from "../controller/cartController";

const cartRouter = express.Router();

cartRouter.post("/add", addToCart);

cartRouter.get("/:userEmail", getCart);

cartRouter.post("/remove", updateCartItem);

export default cartRouter;
