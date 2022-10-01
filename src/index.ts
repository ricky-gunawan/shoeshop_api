import "dotenv/config";
import express from "express";
import { connectDB } from "./config/db";
import { errorHandler, notFoundHandler } from "./middleware/errorMiddleware";
import productRoutes from "./routes/productRoutes";
import uploadRoute from "./routes/uploadRoute";
import userRoutes from "./routes/userRoutes";
import cartRoutes from "./routes/cartRoutes";
import orderRoutes from "./routes/orderRoutes";
import path from "path";

const app = express();

connectDB();

app.use(express.json());

// Product Routes
app.use("/api/products", productRoutes);

// User Routes
app.use("/api/users", userRoutes);

// Cart Routes
app.use("/api/carts", cartRoutes);

// Order Routes
app.use("/api/orders", orderRoutes);

// Upload Route
app.use("/api/upload", uploadRoute);

// Static Routes
app.use("/api/static", express.static(path.join(__dirname, "assets")));

// NotFound Handler
app.use(notFoundHandler);

// Error Handler
app.use(errorHandler);

app.listen(process.env.PORT, () => console.log(`Server running on PORT: ${process.env.PORT}`));
