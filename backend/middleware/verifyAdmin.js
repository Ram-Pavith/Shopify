import { ErrorHandler } from "../helpers/error.js"

const verifyAdmin = (req, res, next)=>{
  const { is_admin } = req.user;
  if (is_admin) {
    req.user = {
      ...req.user,
      is_admin,
    };
    return next();
  } else {
    throw new ErrorHandler(401, "require admin role");
  }
};
export default verifyAdmin