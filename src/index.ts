import "dotenv/config";
import express from "express";
import { connectDB } from "./config/db";
import { errorHandler, notFoundHandler } from "./middleware/errorMiddleware";
import uploadMiddleware from "./middleware/uploadMiddleware";
import productRoutes from "./routes/productRoutes";
import uploadRoute from "./routes/uploadRoute";

const app = express();

connectDB();

app.use(express.json());

// Product Routes
app.use("/api/products", productRoutes);

// Upload Route
app.post("/api/upload", uploadMiddleware, uploadRoute);

// NotFound Handler
app.use(notFoundHandler);

// Error Handler
app.use(errorHandler);

app.listen(process.env.PORT, () => console.log(`Server running on PORT: ${process.env.PORT}`));
