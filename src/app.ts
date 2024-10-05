import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import productRouter from "./routes/productRoutes";
import cartRouter from "./routes/cartRoutes";
import cors from "cors";

// Import routes
// import productRoutes from './routes/productRoutes';
// import cartRoutes from './routes/cartRoutes';

dotenv.config();

const app = express();
app.use(cors());

// Middleware to handle larger request bodies
app.use(bodyParser.json({ limit: "10mb" })); // Set limit to 10MB for JSON payloads
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true })); // Set limit for URL-encoded payloads

app.get("/", async (req, res) => {
  try {
    res.send("Server is Running");
  } catch (err) {
    res.status(500).end(err);
  }
});

// Routes
app.use("/products", productRouter);
app.use("/cart", cartRouter);

// MongoDB connection
const mongoURI = process.env.MONGO_URI || "";
const PORT = process.env.PORT || 3005;

mongoose
  .connect(
    "mongodb+srv://techsupport5:N9EiQJ47P5xDM7Wj@cluster0.y7cik.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error(err));
