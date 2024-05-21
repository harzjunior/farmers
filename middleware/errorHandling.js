// Error handling middleware function
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  // Check if the error is a known type of error
  if (err.name === "ValidationError") {
    // Handle validation errors
    return res.status(400).json({ message: err.message });
  } else if (err.name === "DatabaseError") {
    // Handle database errors
    return res.status(500).json({ message: "Database Error" });
  } else if (err.name === "AuthenticationError") {
    // Handle authentication errors
    return res.status(401).json({ message: "Authentication Failed" });
  }

  // For any other type of error, return a generic 500 Internal Server Error response
  res.status(500).json({ message: "Internal Server Error" });
};

module.exports = errorHandler;
