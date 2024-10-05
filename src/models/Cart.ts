import mongoose from "mongoose";

interface ICartItem {
  productId: mongoose.Schema.Types.ObjectId;
  quantity: number;
}

interface ICart extends mongoose.Document {
  userEmail: string;
  items: ICartItem[];
}

const CartItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  quantity: { type: Number, required: true, min: 1 },
});

const CartSchema = new mongoose.Schema({
  userEmail: { type: String, required: true },
  items: [CartItemSchema],
});

export default mongoose.model<ICart>("Cart", CartSchema);
