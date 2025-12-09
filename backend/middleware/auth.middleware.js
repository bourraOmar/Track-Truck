const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
  const authHeader = req.header.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(400)
      .json({ message: "ccess denied. No token provided." });
  }
  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (ex) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

exports.protectRoute = (allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      return res
        .status(500)
        .json({ message: "User information missing in request." });
    }
    if (!allowedRoles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: "Access denied. Insufficient permissions." });
    }
    next();
  };
};
