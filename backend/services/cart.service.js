import {
  createCartDb,
  getCartDb,
  addItemDb,
  deleteItemDb,
  increaseItemQuantityDb,
  decreaseItemQuantityDb,
  emptyCartDb,
} from "../db/cart.db.js"
import { ErrorHandler } from "../helpers/error.js"
import { logger } from "../utils/logger.js";

class CartService {
  createCart = async (user_id) => {
    try {
      return await createCartDb(user_id);
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  };
  getCart = async (user_id) => {
    try {
      return await getCartDb(user_id);
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  };

  addItem = async (data) => {
    try {
      return await addItemDb(data);
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  };

  removeItem = async (data) => {
    try {
      return await deleteItemDb(data);
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  };

  increaseQuantity = async (data) => {
    try {
      return await increaseItemQuantityDb(data);
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  };

  decreaseQuantity = async (data) => {
    try {
      return await decreaseItemQuantityDb(data);
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  };
  emptyCart = async (cart_id) => {
    try {
      return await emptyCartDb(cart_id);
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  };
}

export default CartService = new CartService()
