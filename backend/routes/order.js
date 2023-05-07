import router from "express"
import {
  getOrder,
  getAllOrders,
  createOrder,
  putOrderPaymentUpdate,
  putOrderDeliverUpdate
} from "../controllers/orders.controller.js"
import verifyToken from "../middleware/verifyToken.js"

const route = router.Router()

route.route("/create").post(verifyToken, createOrder);

route.route("/").get(verifyToken, getAllOrders);

route.route("/:order_id").get(verifyToken, getOrder);

route.route("/:order_id/pay").put(verifyToken, putOrderPaymentUpdate)
route.route("/:order_id/deliver").put(verifyToken,putOrderDeliverUpdate)
export default route;
