import  {
  getAllUsers,
  createUser,
  deleteUser,
  getUserById,
  updateUser,
  getUserProfile,
} from "../controllers/users.controller.js"
import { protect,admin } from "../middleware/authMiddleware.js"
import router from "express"
import verifyAdmin from "../middleware/verifyAdmin.js"
import verifyToken from "../middleware/verifyToken.js"

const route = router.Router()

route.use(verifyToken);
route.route("/").get(verifyAdmin, getAllUsers).post(admin, createUser);
route.route("/profile").get(getUserProfile);
route.route("/:user_id").get(getUserById).put(updateUser).delete(deleteUser);

export default route;
