import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/userModels.js"; // Adjust the path to your User schema

const loginController = async (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res
      .status(400)
      .send({ success: false, message: "Email and password are required." });
  }

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .send({ success: false, message: "User not found" });
    }

    // Verify the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .send({ success: false, message: "Invalid password" });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" } // Token validity duration
    );

    // Send response
    res.status(200).send({
      success: true,
      message: "Login successful.",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(`Error in loginController - ${error.message}`);
    res
      .status(500)
      .send({
        success: false,
        message: "Server error. Please try again later.",
      });
  }
};

export default loginController;
