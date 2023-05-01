import React, { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import ProductCarousel from '../components/ProductCarousel'
import Meta from '../components/Meta'
import { listProducts } from '../actions/productActions'
import "./HomeScreen.css";
import axios from 'axios'
import products from '../data/products'

//temp line
// const x =async()=>{
//   const products = await axios.get('https://localhost:5004/api/products')//require('../data/products')
//   return products
// }
// const products = 
console.log(products)
const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword

  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()

  const productList = useSelector((state) => state.productList)
  //temp line and uncomment next line
  const { loading, error, page, pages } = productList
  // const { loading, error, products, page, pages } = productList

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber))
  }, [dispatch, keyword, pageNumber])

  return (
    //uncomment
    // <>
    //   <Meta />
    //   {!keyword ? (
    //     <ProductCarousel />
    //   ) : (
    //     <Link to='/' className='btn btn-light'>
    //       Go Back
    //     </Link>
    //   )}
    //   <h1>Latest Products</h1>
    //   {loading ? (
    //     <Loader />
    //   ) : error ? (
    //     <Message variant='danger'>{error}</Message>
    //   ) : (
    //     <>
    //       <Row>
    //         {products.map((product) => (
    //           <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
    //             <Product product={product} />
    //           </Col>
    //         ))}
    //       </Row>
    //       <Paginate
    //         pages={pages}
    //         page={page}
    //         keyword={keyword ? keyword : ''}
    //       />
    //     </>
    //   )}
    // </>
    //temp stuff
    <div>
       <Row>
             {products.map((item) => (
               <Col key={item._id} sm={12} md={6} lg={4} xl={3}>
<div className="card">
        <div className="image">
          <img
            src={
              item.image_url
            }
            alt=""
            className="mainImg"
          />
        </div>
        <h2>{item?.name}</h2>
        <div className="prices">
          <h3>${item?.price}</h3>
        </div>
      </div>              

        </Col>
             ))}
        </Row>
    </div>
  )
}

export default HomeScreen
