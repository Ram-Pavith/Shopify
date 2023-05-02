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
import {BarLoader} from 'react-spinners'

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword

  const pageNumber = match.params.pageNumber || 1

  //temp line
  // async function x(){
  //   const productsPromise = await axios.get('http://localhost:5004/api/products')//require('../data/products')
  //   setProducts(productsPromise.data)
  //   console.table(products)
  //   return products
  // }

  const dispatch = useDispatch()

  const productList = useSelector((state) => state.productList)
  //temp line and uncomment next line
  // const { loading, error, page, pages } = productList
  const { loading, error, products, page, pages } = productList
  // console.log(products)
  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber))

  }, [dispatch, keyword, pageNumber])

  if(loading){
    return <BarLoader/>
  }
  else{
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
        <>
          <Row>
              {products.map((product) => (
              <Col key={product.product_id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
              ))}
          </Row>
          <Paginate
              pages={pages}
              page={page}
              keyword={keyword ? keyword : ''}
            />
          </>
      </div>
    )
  }
  
}

export default HomeScreen
