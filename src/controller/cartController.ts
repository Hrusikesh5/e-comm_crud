import type { Request, Response } from "express";
import Cart from "../models/Cart";
import Product from "../models/Product";

// Add product to cart
export const addToCart = async (req: Request, res: Response): Promise<void> => {
  const { userEmail, productId, quantity } = req.body;

  if (!userEmail || !productId || quantity <= 0) {
    res.status(400).json({
      message:
        "Invalid request, please provide user email, product ID, and a valid quantity.",
    });
  }

  try {
    let cart = await Cart.findOne({ userEmail: userEmail });
    const product = await Product.findById(productId);

    if (!product) {
      res.status(404).json({ message: "Product not found" });
    }

    if (cart) {
      // Cart exists, update the cart
      const itemIndex = cart.items.findIndex(
        (item) => item.productId.toString() === productId
      );

      if (itemIndex > -1) {
        // Product exists in cart, update the quantity
        cart.items[itemIndex].quantity += quantity;
      } else {
        // Product does not exist, add new product to cart
        cart.items.push({ productId, quantity });
      }
    } else {
      // No cart found, create a new cart
      cart = new Cart({
        userEmail,
        items: [{ productId, quantity }],
      });
    }

    const updatedCart = await cart.save();
    res.json(updatedCart);
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};

export const getCart = async (req: Request, res: Response): Promise<void> => {
  const userEmail = req.params.userEmail;
  console.log("Fetching cart for user:", userEmail); // Log the email being requested

  if (!userEmail) {
    console.error("No user email provided");
    res.status(400).json({ message: "User email is required." });
  }

  try {
    const cart = await Cart.findOne({ userEmail }).populate("items.productId");
    if (cart) {
      console.log("Cart found:", cart);
      res.json(cart);
    } else {
      console.log("Cart not found for:", userEmail);
      res.status(404).json({ message: "Cart not found" });
    }
  } catch (err: unknown) {
    console.error("Error fetching cart:", err);
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};

export const updateCartItem = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { userEmail, productId, quantity } = req.body;

  if (!userEmail || !productId) {
    res
      .status(400)
      .json({ message: "User email and product ID are required." });
  }
  try {
    let cart = await Cart.findOne({ userEmail });

    if (cart && cart.items.length > 0) {
      const itemIndex = cart.items.findIndex(
        (item) => item.productId.toString() === productId
      );

      if (itemIndex > -1) {
        if (quantity && quantity > 0) {
          cart.items[itemIndex].quantity = quantity;
        } else {
          cart.items.splice(itemIndex, 1);
        }
        const updatedCart = await cart.save();
        res.json(updatedCart);
      } else {
        res.status(404).json({ message: "Product not found in cart" });
      }
    } else {
      res.status(404).json({ message: "Cart not found or empty" });
    }
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};
