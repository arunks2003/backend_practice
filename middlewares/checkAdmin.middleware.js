const isAdmin = (req, res, next) => {
  try {
    // Check if the user's role is "admin"
    if (req.user?.role !== "admin") {
      return res
        .status(403)
        .send({
          success: false,
          message: "Access denied. Admin privileges required.",
        });
    }

    // User is an admin, proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error("Error in isAdmin middleware:", error);
    res
      .status(500)
      .send({
        success: false,
        message: "Server error. Please try again later.",
      });
  }
};

export default isAdmin;
