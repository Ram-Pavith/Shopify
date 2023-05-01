import router from "express"
import {
  createAccount,
  loginUser,
  googleLogin,
  forgotPassword,
  verifyResetToken,
  resetPassword,
  refreshToken,
} from "../controllers/auth.controller.js"

const route = router.Router()

route.post("/signup", createAccount);

route.post("/login", loginUser);

route.post("/google", googleLogin);

route.post("/forgot-password", forgotPassword);

// token for reset password
route.post("/check-token", verifyResetToken);

route.post("/reset-password", resetPassword);

route.post("/refresh-token", refreshToken);

export default route
