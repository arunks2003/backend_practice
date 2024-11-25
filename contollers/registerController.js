import bcrypt from "bcrypt";
import User from "../models/userModels.js"; // Adjust the path to your User schema

const registerController = async (req, res) => {
  const { name, email, password, phone, address } = req.body;

  // Validate input
  if (!name || !email || !password || !phone || !address) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already in use." });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
    });

    // Save the user to the database
    await user.save();

    res.status(201).json({ message: "User registered successfully!!!", user });
  } catch (error) {
    console.error("Error in registerController:", error);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
};

export default registerController;
