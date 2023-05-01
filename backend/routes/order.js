import router from "express"
import {
  getOrder,
  getAllOrders,
  createOrder,
} from "../controllers/orders.controller.js"
import verifyToken from "../middleware/verifyToken.js"

const route = router.Router()

route.route("/create").post(verifyToken, createOrder);

route.route("/").get(verifyToken, getAllOrders);

route.route("/:order_id").get(verifyToken, getOrder);

export default route;
