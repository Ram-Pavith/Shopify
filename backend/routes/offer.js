import router from "express"
import verifyToken from "../middleware/verifyToken.js"
import {applyOffer,applyOfferCart} from "../controllers/offer.controller.js"

const route = router.Router()

route.use(verifyToken);

route.route("/applyoffer/:order_id").post(verifyToken,applyOffer)
route.route("/cart/applyoffer/:cart_id").post(verifyToken,applyOfferCart)

export default route