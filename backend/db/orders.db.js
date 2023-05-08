import pool from "../config/db.js"
import {v4} from 'uuid'

const createOrderDb = async ({
  cart_id,
  price,
  user_id,
  payment_method,
  shipping_price,
  address,
  city,
  state,
  country,
  tax_price,
  total
}) => {
  const order_id = v4()
  console.log(cart_id,price,user_id,payment_method,shipping_price,tax_price,total)
  // create an order
  const { rows: order } = await pool.query(
    "INSERT INTO orders(user_id, price, payment_method,tax_price,shipping_price,total,order_id, payment_status,address,city,state,country) VALUES($1, $2, $3, $4, $5,$6,$7,$8,$9,$10,$11,$12) returning *",
    [user_id,price, payment_method,tax_price,shipping_price,total,order_id,"NOT PAID",address,city,state,country]
  );

  // copy cart items from the current cart_item table into order_item table
  await pool.query(
    `
      INSERT INTO order_item(order_id,product_id,price,image, quantity)
      SELECT $1, p.product_id,p.price,p.image_url,cart_item.quantity from cart_item join products as p on p.product_id = cart_item.product_id where cart_id = $2
      returning *
      `,
    [order[0].order_id, cart_id]
  );
  console.log(order)
  return order;
};

const getAllOrdersByUserDb = async ({ user_id, limit, offset }) => {
  const { rows:orders } = await pool.query(
    "SELECT * from orders WHERE orders.user_id = $1",
    [user_id]
  );
  return orders;
};

const getAllOrdersDb = async () => {
  const { rows:orders } = await pool.query(
    "SELECT * from orders"
  );
  return orders;
};

const getOrderDb = async ({ order_id, user_id }) => {
  console.log(order_id,user_id)
  const { rows: order } = await pool.query(
    `SELECT orders.*,products.*, order_item.quantity,order_item.order_item_id as order_item_id 
      from orders 
      join order_item
      on order_item.order_id = orders.order_id
      join products 
      on products.product_id = order_item.product_id 
      where orders.order_id = $1 AND orders.user_id = $2`,
    [order_id, user_id]
  );
  console.log(order)
  return order;
};

const payOrderDb = async ({order_id,payment_status})=>{
  const {rowCount} = await pool.query(
    `UPDATE orders SET payment_status = $2 where order_id=$1;`,
    [order_id,payment_status]
  )
  console.log(rowCount)
  console.log(order_id,payment_status)
  return rowCount;
}

const deliverOrderDb = async ({order_id})=>{
  const {rowCount} = await pool.query(
    `UPDATE orders SET delivered_at = now(),is_delivered=true where order_id=$1;`,
    [order_id,payment_status]
  )
  console.log(rowCount)
  console.log(order_id,payment_status)
  return rowCount;
}

export {
  createOrderDb,
  getAllOrdersByUserDb,
  getAllOrdersDb,
  getOrderDb,
  payOrderDb,
  deliverOrderDb
};
