import jwt from "jsonwebtoken";
import  errorHandler  from "./errorHandler.js";

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res
      .status(401)
      .send(errorHandler(401, "Unauthorized", "User is unauthorized"));
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res
        .status(403)
        .send(errorHandler(403, "Invalid token", "Token is invalid"));
    }
    req.user = user;
    next();
  });
};
