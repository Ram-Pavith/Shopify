import orderService from "../services/order.service.js"
import cartService from "../services/cart.service.js"

const createOrder = async (req, res) => {
  const { amount, price, payment_method, ref } = req.body;
  const user_id = req.user.user_id;
  const cart_id = req.user.cart_id;

  const newOrder = await orderService.createOrder({
    cart_id,
    price,
    user_id,
    payment_method:"PAYPAL",
    tax_price:price*0.18,
    shipping_price:10,
    total:price*1.18 + 10
  });
  try{
  // delete all items from cart_items table for the user after order has been processed
  await cartService.emptyCart(cart_id);

  res.status(201).json(newOrder);
  }
  catch(err){
    console.log(err)
    res.status(400).json({message:err.message,stackTrace:err.stack})
  }


};

const getAllOrders = async (req, res) => {
  const { page = 1 } = req.query;
  const userId = req.user.user_id;
  try{
    const orders = await orderService.getAllOrders(userId, page);
    res.status(200).json(orders);
  }
  catch(err){
    res.status(400).json({message:err.message,stackTrace:err.stack})
  }

};

const getOrder = async (req, res) => {
  const { order_id } = req.params.order_id;
  const userId = req.user.user_id;
  try{
    const order = await orderService.getOrderById({ order_id, userId });
    res.status(200).json(order);
  }
  catch(err){
    res.status(400).json({message:err.message,stackTrace:err.stack})
  }

};

export {
  createOrder,
  getAllOrders,
  getOrder,
};
