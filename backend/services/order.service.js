import {
  createOrderDb,
  getAllOrdersDb,
  getOrderDb,
} from "../db/orders.db.js"
import { ErrorHandler } from "../helpers/error.js"
import { logger } from "../utils/logger.js";

class OrderService {
  createOrder = async (data) => {
    try {
      return await createOrderDb(data);
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  };

  getAllOrders = async (user_id, page) => {
    const limit = 5;
    const offset = (page - 1) * limit;
    try {
      return await getAllOrdersDb({ user_id, limit, offset });
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  };

  getOrderById = async (data) => {
    try {
      const order = await getOrderDb(data);
      if (!order) {
        throw new ErrorHandler(404, "Order does not exist");
      }
      return order;
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  };
}

export default OrderService = new OrderService()
