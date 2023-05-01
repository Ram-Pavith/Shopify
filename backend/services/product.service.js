import {
  getAllProductsDb,
  createProductDb,
  getProductDb,
  updateProductDb,
  deleteProductDb,
  getProductByNameDb,
} from "../db/product.db.js"
import { ErrorHandler } from "../helpers/error.js"
import { logger } from "../utils/logger.js";

class ProductService {
  getAllProducts = async (page) => {
    const limit = 12;
    const offset = (page - 1) * limit;
    try {
      return await getAllProductsDb({ limit, offset });
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  };

  addProduct = async (data) => {
    try {
      return await createProductDb(data);
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  };

  getProductById = async (product_id) => {
    try {
      const product = await getProductDb(product_id);
      if (!product) {
        throw new ErrorHandler(404, "product not found");
      }
      return product;
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  };

  getProductByName = async (name) => {
    try {
      const product = await getProductByNameDb(name);
      if (!product) {
        throw new ErrorHandler(404, "product not found");
      }
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  };

  updateProduct = async (data) => {
    try {
      const product = await getProductDb(data.id);
      if (!product) {
        throw new ErrorHandler(404, "product not found");
      }
      return await updateProductDb(data);
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  };

  removeProduct = async (product_id) => {
    try {
      //id = parseInt(product_id)
      const product = await getProductDb(product_id);
      if (!product) {
        throw new ErrorHandler(404, "product not found");
      }
      return await deleteProductDb(id);
    } catch (error) {
      logger.error(error)
      throw new ErrorHandler(error.statusCode, error.message);
    }
  };
}

export default ProductService = new ProductService()
