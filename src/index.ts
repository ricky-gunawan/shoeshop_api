import "dotenv/config";
import express from "express";
import path from "path";
import cors from "cors";
import corsOptions from "./config/corsOptions";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db";
import { errorHandler, notFoundHandler } from "./middleware/errorMiddleware";
import authRoutes from "./routes/authRoutes";
import productRoutes from "./routes/productRoutes";
import uploadRoute from "./routes/uploadRoute";
import userRoutes from "./routes/userRoutes";
import cartRoutes from "./routes/cartRoutes";
import orderRoutes from "./routes/orderRoutes";
import credentials from "./middleware/credentials";
import verifyJWT from "./middleware/verifyJWT";

const app = express();

connectDB();

app.use(credentials);

// Cors Origin Resource Sharing
app.use(cors(corsOptions));

app.use(express.json());

app.use(cookieParser());

// Static Routes
app.use("/api/static", express.static(path.join(__dirname, "assets")));

// User Auth Routes
app.use("/api/auth", authRoutes);

// Product Routes
app.use("/api/products", productRoutes);

app.use(verifyJWT);

// User Routes
app.use("/api/users", userRoutes);

// Cart Routes
app.use("/api/carts", cartRoutes);

// Order Routes
app.use("/api/orders", orderRoutes);

// Upload Route
app.use("/api/upload", uploadRoute);

// NotFound Handler
app.use(notFoundHandler);

// Error Handler
app.use(errorHandler);

app.listen(process.env.PORT, () => console.log(`Server running on PORT: ${process.env.PORT}`));
