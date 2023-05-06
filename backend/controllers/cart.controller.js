import cartService from "../services/cart.service.js"

const getCart = async (req, res) => {
  const userId = req.user.user_id;
  try{
  // get cart items
  const cart = await cartService.getCart(userId);
  console.log(cart)
  res.status(200).json({ items: cart });
  }
  catch(err){
    res.status(400).json({message:err.message,stackTrace:err.stack})
  }

};
const createCart = async (req,res) =>{
  const userId = req.user.user_id
  try{
    const cart = await cartService.createCart(userId)
  }
  catch(err){
    res.status(400).json({message:err.message,stackTrace:err.stack})
  }
}
// add item to cart
const addItem = async (req, res) => {
  const cart_id = req.user.cart_id;
  try{
    const cart = await cartService.addItem({ ...req.body, cart_id });
    res.status(200).json({ data: cart });
  }
  catch(err){
    res.status(400).json({message:err.message,stackTrace:err.stack})
  }

};

// delete item from cart
const deleteItem = async (req, res) => {
  const { product_id,cart_item_id } = req.body;
  try{
    const data = await cartService.removeItem({ cart_item_id, product_id });
    res.status(200).json(data);
  }
  catch(err){
    res.status(400).json({message:err.message,stackTrace:err.stack})
  }

};

// increment item quantity by 1
const increaseItemQuantity = async (req, res) => {
  const { product_id } = req.body;
  const cart_id = req.user.cart_id;
  try{
    const cart = await cartService.increaseQuantity({ cart_id, product_id });
    res.status(200).json(cart);
  }
  catch(err){
    res.status(400).json({message:err.message,stackTrace:err.stack})
  }

};

// decrement item quantity by 1
const decreaseItemQuantity = async (req, res) => {
  const { product_id } = req.body;
  const cart_id = req.user.cart_id;
  try{
    const cart = await cartService.decreaseQuantity({ cart_id, product_id });
    res.status(200).json(cart);
  }
  catch(err){
    res.status(400).json({message:err.message,stackTrace:err.stack})
  }

};

const emptyCart = async (req, res) => {
  const cartId = req.user.cart_id;
  try{
  // get cart items
  const cart = await cartService.emptyCart(cartId);
  res.status(200).json({ items: cart.rows });
  }
  catch(err){
    res.status(400).json({message:err.message,stackTrace:err.stack})
  }

};

export {
  getCart,
  createCart,
  addItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  deleteItem,
  emptyCart
};
