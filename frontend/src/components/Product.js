import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import Rating from './Rating'
import "./Product.css"
const Product = ({ product }) => {
  return (
      <Link className="link" to={`/product/${product.product_id}`}>
      <div className="card">
        <div className="image">
          {product.category.includes("New Season") && <span>New Season</span>}
          <img
            src={
              product.image_url
            }
            alt=""
            className="mainImg"
          />
        </div>
        <h2>{product?.name}</h2>
        <div className="prices">
          <h3>${product.price}</h3>
        </div>
        <Rating
            value={product.rating}
            text={`${product.num_reviews} reviews`}
          />
      </div>
      </Link>
  )
}

export default Product
