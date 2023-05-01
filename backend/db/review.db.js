import pool from "../config/db.js"

const getReviewsDb = async ({ product_id, user_id }) => {
  // check if current logged user review exist for the product
  const reviewExist = await pool.query(
    "SELECT EXISTS (SELECT * FROM reviews where product_id = $1 and user_id = $2)",
    [product_id, user_id]
  );

  // get reviews associated with the product
  const reviews = await pool.query(
    `SELECT users.fullname as name, reviews.* FROM reviews
        join users 
        on users.user_id = reviews.user_id
        WHERE product_id = $1`,
    [[product_id]]
  );
  return {
    reviewExist: reviewExist.rows[0].exists,
    reviews: reviews.rows,
  };
};

const createReviewDb = async ({ product_id, comment, rating, user_id }) => {
  const { rows: review } = await pool.query(
    `INSERT INTO reviews(user_id, product_id, comment, rating) 
       VALUES($1, $2, $3, $4) returning *
      `,
    [user_id, product_id, comment, rating]
  );
  return review[0];
};

const updateReviewDb = async ({ comment, rating, review_id }) => {
  const { rows: review } = await pool.query(
    `UPDATE reviews set comment = $1, rating = $2 where review_id = $3 returning *
      `,
    [comment, rating, review_id]
  );
  return review[0];
};

export {
  createReviewDb,
  updateReviewDb,
  getReviewsDb,
};
