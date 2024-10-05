import mongoose from "mongoose";

interface IProduct extends mongoose.Document {
  name: string;
  price: number;
  description: string;
  image: string;
}

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  image: {
    type: String,
    default: "../../image17_3cfc7cfb-8215-40b7-a297-db7285d5375b.webp",
  },
});

export default mongoose.model<IProduct>("Product", ProductSchema);
