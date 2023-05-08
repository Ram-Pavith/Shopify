import { ErrorHandler } from "../helpers/error.js"
import jwt from "jsonwebtoken"


const verifyAdmin = (req, res, next)=>{
  const token = req.header("authToken");
  if (!token) {
    throw new ErrorHandler(401, "Token missing");
  }
  const verified = jwt.verify(token, process.env.SECRET);
  req.user = verified;  
  const is_admin = req.user.is_admin
  if (is_admin) {
    req.user = {
      ...req.user,
    };
    console.log(req.user)
    return next();
  } else {
    throw new ErrorHandler(401, "require admin role");
  }
};
export default verifyAdmin