const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const User = require("./Models/User");

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);

    const existing = await User.findOne({ email: "admin@gmail.com" });

    if (existing) {
      console.log("Admin already exists");
      process.exit();
    }

    const hashedPass = await bcrypt.hash("123456", 10);

    await User.create({
      name: "Admin",
      email: "admin@gmail.com",
      password: hashedPass,
      role: "admin",
      status: "active",
    });

    console.log("Admin created");
    process.exit();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

createAdmin();
