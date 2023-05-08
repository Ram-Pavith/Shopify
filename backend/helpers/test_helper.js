import pool from "../config"

const usersInDb = async () => {
  const users = await pool.query("SELECT * FROM USERS");
  return users.rows;
};

const productsInDb = async () => {
  const products = await pool.query("SELECT * FROM products");
  return products.rows;
};

export { usersInDb, productsInDb };
