import { connectDB } from "../config/db";
import Product from "./productModel";
import User from "./userModel";
import { productsList } from "./productsList";
import { userList } from "./userList";
import Cart from "./cartModel";

connectDB();

const importData = async () => {
  try {
    await Product.deleteMany();
    await User.deleteMany();
    await Cart.deleteMany();

    await Product.insertMany(productsList);
    await User.insertMany(userList);
    console.log("data imported");
    process.exit(0);
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Product.deleteMany();
    await User.deleteMany();
    await Cart.deleteMany();
    console.log("data destroyed");
    process.exit(0);
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
