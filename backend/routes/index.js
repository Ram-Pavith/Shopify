import router from "express"
import cart from "./cart.js"
import order from "./order.js"
import product from "./product.js"
import users from "./users.js"
import auth from "./auth.js"
import payment from "./payment.js"
import offers from "./offer.js"

const route = router.Router()

route.use("/auth", auth);
route.use("/users", users);
route.use("/products", product);
route.use("/orders", order);
route.use("/cart", cart);
route.use("/payment", payment);
route.use("/offers",offers)

export default route;
