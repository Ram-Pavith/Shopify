import router from "express"
import {
  getOrder,
  getAllOrdersByUser,
  getAllOrders,
  createOrder,
  putOrderPaymentUpdate,
  putOrderDeliverUpdate
} from "../controllers/orders.controller.js"
import verifyToken from "../middleware/verifyToken.js"
import verifyAdmin from "../middleware/verifyAdmin.js"
const route = router.Router()

route.route("/create").post(verifyToken, createOrder);

route.route("/").get(verifyAdmin,getAllOrders)

route.route("/user/:user_id").get(verifyToken, getAllOrdersByUser);

route.route("/:order_id").get(verifyToken, getOrder);

route.route("/:order_id/pay/:payment_status").put(verifyToken, putOrderPaymentUpdate)
route.route("/:order_id/deliver").put(verifyToken,putOrderDeliverUpdate)
export default route;
