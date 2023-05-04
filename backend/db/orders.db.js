import pool from "../config/db.js"
import {v4} from 'uuid'

const createOrderDb = async ({
  cart_id,
  price,
  user_id,
  payment_method,
  shipping_price,
  tax_price,
  total
}) => {
  const order_id = v4()
  console.log(cart_id,price,user_id,payment_method,shipping_price,tax_price,total)
  // create an order
  const { rows: order } = await pool.query(
    "INSERT INTO orders(user_id, price, payment_method,tax_price,shipping_price,total,order_id, payment_status) VALUES($1, $2, $3, $4, $5,$6,$7,$8) returning *",
    [user_id,price, payment_method,tax_price,shipping_price,total,order_id,"NOT PAID"]
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

const getAllOrdersDb = async ({ user_id, limit, offset }) => {
  const { rowCount } = await pool.query(
    "SELECT * from orders WHERE orders.user_id = $1",
    [user_id]
  );
  const orders = await pool.query(
    `SELECT order_id, user_id, status, date::date, amount, total 
      from orders WHERE orders.user_id = $1 order by order_id desc limit $2 offset $3`,
    [user_id, limit, offset]
  );
  return { items: orders.rows, total: rowCount };
};

const getOrderDb = async ({ order_id, user_id }) => {
  console.log(order_id,user_id)
  const { rows: order } = await pool.query(
    `SELECT products.*, order_item.quantity 
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

export {
  createOrderDb,
  getAllOrdersDb,
  getOrderDb,
};
