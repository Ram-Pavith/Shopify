import router from "express"
import verifyToken from "../middleware/verifyToken.js"
import {
  getCart,
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
} from "../controllers/cart.controller.js"

const route = router.Router()

route.use(verifyToken);
// get cart items
route.route("/").get(getCart);

// add item to cart
route.route("/add").post(addItem);

// delete item from cart
route.route("/delete").delete(deleteItem);

// increment item quantity
route.route("/increment").put(increaseItemQuantity);

// decrement item quantity
route.route("/decrement").put(decreaseItemQuantity);

export default route
