import pool from "../config/db.js"

const getAllUsersDb = async () => {
  const { rows: users } = await pool.query("select * from users");
  return users;
};

const createUserDb = async ({ username, password, email,city,state,country }) => {
  const { rows: user } = await pool.query(
    `INSERT INTO users(username, password, email,city,state,country) 
    VALUES($1, $2, $3,$4,$5,$6) 
    returning user_id, username, email, address, city, state, country, created_at`,
    [username, password, email,city,state,country]
  );
  return user[0];
};

const getUserByIdDb = async (user_id) => {
  const { rows: user } = await pool.query(
    "select users.*,cart.cart_id as cart_id from users left join cart on cart.user_id = users.user_id where users.user_id = $1",
    [user_id]
  );
  return user[0];
};
const getUserByUsernameDb = async (username) => {
  const { rows: user } = await pool.query(
    "select users.*, cart.cart_id as cart_id from users left join cart on cart.user_id = users.user_id where lower(users.username) = lower($1)",
    [username]
  );
  return user[0];
};

const getUserByEmailDb = async (email) => {
  const { rows: user } = await pool.query(
    "select users.*, cart.cart_id as cart_id from users left join cart on cart.user_id = users.user_id where lower(email) = lower($1)",
    [email]
  );
  return user[0];
};

const updateUserDb = async ({
  username,
  email,
  user_id,
  address,
  city,
  state,
  country,
}) => {
  const { rows: user } = await pool.query(
    `UPDATE users set username = $1, email = $2, address = $3, city = $4, state = $5, country = $6 
      where user_id = $8 returning username, email, fullname, user_id, address, city, country, state`,
    [username, email, address, city, state, country, user_id]
  );
  return user[0];
};

const deleteUserDb = async (user_id) => {
  const { rows: user } = await pool.query(
    "DELETE FROM users where user_id = $1 returning *",
    [user_id]
  );
  return user[0];
};

const createUserGoogleDb = async ({ sub, defaultUsername, email, name }) => {
  const { rows } = await pool.query(
    `INSERT INTO users(google_id,username, email, fullname) 
      VALUES($1, $2, $3, $4) ON CONFLICT (email) 
      DO UPDATE SET google_id = $1, fullname = $4 returning *`,
    [sub, defaultUsername, email, name]
  );
  return rows[0];
};

const changeUserPasswordDb = async (hashedPassword, email) => {
  return await pool.query("update users set password = $1 where email = $2", [
    hashedPassword,
    email,
  ]);
};

export {
  getAllUsersDb,
  getUserByIdDb,
  getUserByEmailDb,
  updateUserDb,
  createUserDb,
  createUserGoogleDb,
  deleteUserDb,
  getUserByUsernameDb,
  changeUserPasswordDb,
};
