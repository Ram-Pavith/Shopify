import router from "express"
import {
  getAllProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  getProductByName,
  getProductReviews,
  createProductReview,
  updateProductReview,
} from "../controllers/products.controller.js"
import verifyAdmin from "../middleware/verifyAdmin.js"
import verifyToken from "../middleware/verifyToken.js"

const route = router.Router()

route
  .route("/")
  .get(getAllProducts)
  .post(verifyToken, verifyAdmin, createProduct);

route
  .route("/:product_id")
  .get(getProduct)
  .get(getProductByName)
  .put(verifyToken, verifyAdmin, updateProduct)
  .delete(verifyToken, verifyAdmin, deleteProduct);

route
  .route("/:product_id/reviews")
  .get(getProductReviews)
  .post(verifyToken, createProductReview)
  .put(verifyToken, updateProductReview);

export default route;
