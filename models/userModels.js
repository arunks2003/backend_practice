import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true, // Removes extra spaces
    },
    email: {
      type: String,
      required: true,
      unique: true, // Ensures no duplicate emails
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email address",
      ],
    },
    password: {
      type: String,
      required: true,
      minlength: 6, // Ensures the password is at least 6 characters
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"], // Restricts roles to specific values
      default: "user",
    },
    isActive: {
      type: Boolean,
      default: true, // Tracks if the user is active
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Create a model
const User = mongoose.model("User", userSchema);

// Export the model
export default User;
