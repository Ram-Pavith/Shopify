import router from "express"
import verifyToken from "../middleware/verifyToken.js"
import {
  getCart,
  createCart,
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  emptyCart,
} from "../controllers/cart.controller.js"

const route = router.Router()

route.use(verifyToken);
// get cart items
route.route("/")
.get(getCart)
.post(createCart)
// add item to cart
route.route("/add").post(addItem);

// empty cart
route.route("/clear").get(emptyCart)
// delete item from cart
route.route("/delete/:cart_item_id").delete(deleteItem);

// increment item quantity
route.route("/increment/:cart_item_id").put(increaseItemQuantity);

// decrement item quantity
route.route("/decrement/:cart_item_id").put(decreaseItemQuantity);

export default route
