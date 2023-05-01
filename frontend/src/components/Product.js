import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import Rating from './Rating'
import "./Product.css"
const Product = ({ product }) => {
  return (
    <Card className='my-3 p-3 rounded'>
      <Link className="link" to={`/product/${product.product_id}`}>
      <Card.Body>
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
      </div>
      </Card.Body>
      </Link>
    </Card>
  )
}

const Card = ({ item }) => {
  console.log(item);
  return (
    <Link className="link" to={`/product/${item.id}`}>
      <div className="card">
        <div className="image">
          {item?.attributes.isNew && <span>New Season</span>}
          <img
            src={
              process.env.REACT_APP_UPLOAD_URL + item.attributes?.img?.data?.attributes?.url
            }
            alt=""
            className="mainImg"
          />
          <img
            src={
              process.env.REACT_APP_UPLOAD_URL + item.attributes?.img2?.data?.attributes?.url
            }
            alt=""
            className="secondImg"
          />
        </div>
        <h2>{item?.attributes.title}</h2>
        <div className="prices">
          <h3>${item.oldPrice || item?.attributes.price + 20}</h3>
          <h3>${item?.attributes.price}</h3>
        </div>
      </div>
    </Link>
  );
};

export default Product
