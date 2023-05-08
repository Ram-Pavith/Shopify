import { makePayment } from "../controllers/payment.controller.js"

import router from "express"

const route = router.Router()

route.route("/").post(makePayment);

export default route;
