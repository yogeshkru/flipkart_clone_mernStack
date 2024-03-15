const userSchema = require("../model/userModel");
const jwt=require("jsonwebtoken")
require("dotenv").config()
exports.signUp = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const existingUser = await userSchema.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ message: "User already registered" });
    }

    const newUser = new userSchema({
      firstName,
      lastName,
      email,
      password,
      username: Math.random().toString(),
    });

    const savedUser = await newUser.save();
    return res.status(200).json({ savedUser });
  } catch (error) {
    console.error("Error signing up user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};





exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userSchema.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.authenticate(password)) {
      const token = jwt.sign({ _id: user._id }, process.env.SECRET, { expiresIn: "3d" });
      const { firstName, lastName, email, role,fullName } = user;
      return res.status(200).json({
        token,
        user: {
          firstName, lastName, email, role,fullName
        }
      });
    } else {
      return res.status(401).json({ message: "Incorrect password" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

