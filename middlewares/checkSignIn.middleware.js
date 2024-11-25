import JWT from "jsonwebtoken";

export const requiredSignIn = (req, res, next) => {
  try {
    // Extract the token from the Authorization header
    const token = req.headers.authorization; // Format: "Bearer <token>"

    if (!token) {
      return res
        .status(401)
        .send({ success: false, message: "Access denied. No token provided." });
    }

    // Verify the token
    const decoded = JWT.verify(token, process.env.JWT_SECRET);

    // Attach the user information to the request object
    // console.log(decoded);
    req.user = decoded;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error("Error in requiredSignIn middleware:", error);
    res
      .status(401)
      .send({ success: false, message: "Invalid or expired token." });
  }
};
