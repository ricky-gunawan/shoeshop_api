import { connectDB } from "../config/db";
import Product from "./productModel";
import { productsList } from "./productsList";

connectDB();

const importData = async () => {
  try {
    await Product.deleteMany();

    await Product.insertMany(productsList);
    console.log("Data imported");
    process.exit(0);
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Product.deleteMany();
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
