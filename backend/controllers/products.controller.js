import pool from "../config/db.js"
import productService from "../services/product.service.js"
import {client,cache} from '../config/redis.js'
const getAllProducts = async (req, res) => {
try{
  const key = "products"
  if(client.get(key)){
    client.get(key, function(err,result){
      if (result===null) {
        // // Set data to Redis
          console.log("in loop")
          setCache()
      }else{
        res.status(200).json(JSON.parse(result))
      }
    });
  }
  const setCache = async ()=>{
    const products = await productService.getAllProducts(1);
    client.set(key, JSON.stringify(products),(err,reply)=>{
      if(err){
        res.status(400).json({message:err.message,stackTrace:err.stack})
      }
      else{
        res.status(200).json(products)
      }
    })      
  }
}
catch(err){
  res.status(400).json({message:err.message,stackTrace:err.stack})
}
 };

const createProduct = async (req, res) => {
  const { name, price, description, image_url,brand,count_in_stock,category } = req.body;
  const user_id = req.user.user_id
  try{
    const newProduct = await productService.addProduct({
      name,
      price,
      description,
      image_url,
      brand,
      count_in_stock,
      user_id,
      category
    })
    const key = "products"
    client.del(key)
    client.del(category)
    res.status(200).json(newProduct);
  }
  catch(err){
    res.status(400).json({message:err.message,stackTrace:err.stack})
  }

};

const getProduct = async (req, res) => {
  try{
    const product = await productService.getProductById(req.params.product_id);
    res.status(200).json(product);
  }
  catch(err){
    res.status(400).json({message:err.message,stackTrace:err.stack})
  }
};

const getProductByName = async (req, res) => {
  try{
    const product = await productService.getProductByName(req.params.name);
    res.status(200).json(product);
  }
  catch(err){
    res.status(400).json({message:err.message,stackTrace:err.stack})
  }
};

const getProductByCategory = async (req,res) => {
  try{
    const key = req.params.category
    if(client.get(key)){
      client.get(key, function(err,result){
        if (result===null) {
          // // Set data to Redis
            setCacheProducts()
        }else{
          res.status(200).json(JSON.parse(result))
        }
      });
    }
    const setCacheProducts= async()=>{
      const products = await productService.getProductByCategory(key);
      client.set(key, JSON.stringify(products),(err,reply)=>{
        if(err){
          res.status(400).json(err)
        }
        else{
          res.status(200).json(products)
        }
      })      
    }
  }
  catch(err){
    res.status(400).json({message:err.message,stackTrace:err.stack})
  }
}

const updateProduct = async (req, res) => {
  const { name, price, description, image_url, city, state, country } = req.body;
  try{
    const updatedProduct = await productService.updateProduct({
      name,
      price,
      description,
      image_url,
      product_id,
      city,
      state,
      country,
      shipping_price:10,
      tax_price:price*0.18,
      total:price*1.18 + 10
    });
    res.status(200).json(updatedProduct);
  }
  catch(err){
    res.status(400).json({message:err.message,stackTrace:err.stack})
  }
  const { product_id } = req.params.product_id;
};

const deleteProduct = async (req, res) => {
  const { product_id } = req.params.product_id;
  try{
    const deletedProduct = productService.removeProduct(product_id);
    res.status(200).json(deletedProduct);
  }
  catch(err){
    res.status(400).json({message:err.message,stackTrace:err.stack})
  }

};

// TODO create a service for reviews

const getProductReviews = async (req, res) => {
  const { product_id, user_id } = req.query;
  try {
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
      [product_id]
    );
    res.status(200).json({
      reviewExist: reviewExist.rows[0].exists,
      reviews: reviews.rows,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};


const createProductReview = async (req, res) => {
  const { product_id, comment, rating } = req.body;
  const user_id = req.user.user_id;

  try {
    const result = await pool.query(
      `INSERT INTO reviews(user_id, product_id, comment, rating) 
       VALUES($1, $2, $3, $4) returning *
      `,
      [user_id, product_id, comment, rating]
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json(error.detail);
  }
};

const updateProductReview = async (req, res) => {
  const { comment, rating, review_id } = req.body;

  try {
    const result = await pool.query(
      `UPDATE reviews set comment = $1, rating = $2 where review_id = $3 returning *
      `,
      [comment, rating, review_id]
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json(error);
  }
};

export {
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getProductByName,
  getProductByCategory,
  getProductReviews,
  updateProductReview,
  createProductReview,
};
