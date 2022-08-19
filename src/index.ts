import "dotenv/config";
import express from "express";
import { connectDB } from "./config/db";
import { errorHandler, notFoundHandler } from "./middleware/errorMiddleware";
import productRouter from "./routes/productRoutes";

const app = express();

connectDB();

app.use(express.json());

// Product Routes
app.use("/api/products", productRouter);

// NotFound Handler
app.use(notFoundHandler);

// Error Handler
app.use(errorHandler);

app.listen(process.env.PORT, () => console.log(`Server running on PORT: ${process.env.PORT}`));
