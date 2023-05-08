import router from "express"
import verifyToken from "../middleware/verifyToken.js"
import {applyOffer} from "../controllers/offer.controller.js"

const route = router.Router()

route.use(verifyToken);

route.route("/applyoffer/:order_id").post(applyOffer)

export default route