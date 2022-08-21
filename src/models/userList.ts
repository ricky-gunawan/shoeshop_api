import bcrypt from "bcryptjs";

export const userList = [
  {
    name: "User 1",
    email: "user1@user.com",
    password: bcrypt.hashSync("user123xyz", 10),
    address: "jalan lurus tanpa belokan, Bandung",
  },
  {
    name: "User 2",
    email: "user2@user.com",
    password: bcrypt.hashSync("user123xyz", 10),
    address: "jalan terus pantang mundur, Bandung",
  },
  {
    name: "Admin",
    email: "admin@admin.com",
    password: bcrypt.hashSync("admin123xyz", 10),
    address: "jalan kaki di tempat grakk, Bandung",
    isAdmin: true,
  },
];
