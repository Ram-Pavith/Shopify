import pool from "../config/db.js"

const createOrderDb = async ({
  cart_id,
  amount,
  price,
  user_id,
  ref,
  payment_method,
  shipping_price,
  tax_price,
  total
}) => {
  // create an order
  const { rows: order } = await pool.query(
    "INSERT INTO orders(user_id, payment_status, price, ref, payment_method,shipping_price,tax_price,total) VALUES($1, 'success', $2, $3, $4, $5,$6,$7,$8,) returning *",
    [user_id, amount, price, ref, payment_method,tax_price,shipping_price,total]
  );

  // copy cart items from the current cart_item table into order_item table
  await pool.query(
    `
      INSERT INTO order_item(order_id,product_id, quantity)
      SELECT $1, product_id, quantity from cart_item where cart_id = $2
      returning *
      `,
    [order[0].order_id, cart_id]
  );
  return order[0];
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
  return order;
};

export {
  createOrderDb,
  getAllOrdersDb,
  getOrderDb,
};
