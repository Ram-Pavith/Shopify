import jwt from "jsonwebtoken"
import { ErrorHandler } from "../helpers/error.js"

const verifyToken = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    throw new ErrorHandler(401, "Token missing");
  }

  try {
    const verified = jwt.verify(token, process.env.SECRET);
    req.user = verified;
    next();
  } catch (error) {
    throw new ErrorHandler(401, error.message || "Invalid Token");
  }
};

export default verifyToken;
