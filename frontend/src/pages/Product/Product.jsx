import React from "react";
import { useState, useEffect } from "react";
import "./Product.scss";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import BalanceIcon from "@mui/icons-material/Balance";
import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../actions/cartActions.js";
import { listProductDetails } from "../../actions/productActions";
import axios from 'axios'
import { BarLoader } from "react-spinners";
const Product = () => {
  const id = useParams().product_id;
  console.log(id)
  const [selectedImg, setSelectedImg] = useState("img");
  const [quantity, setQuantity] = useState(1);
  // const [product,setProduct] = useState({})
  // const [loading,setLoading] = useState(true)
  // const {data,isLoading:loading,error} = listProductDetails()
  const productDetails = useSelector((state) => state.productDetails);
  const { loading,product, error } = productDetails
  const dispatch = useDispatch();
 useEffect(()=>{
  dispatch(listProductDetails(id))
  },[dispatch,id])
  const data = product
  if(loading){
    return <BarLoader/>
  }
  else{
     return (
      <div className="product">
      <>
        <div className="left">
          <div className="images">
            <img
              src={
                data.image_url
              }
              alt=""
              onClick={(e) => setSelectedImg("img")}
            />
          </div>
          <div className="mainImg">
            <img
              src={
               data.image_url
              }
              alt=""
            />
          </div>
        </div>
        <div className="right">
          <h1>{data?.name}</h1>
          <span className="price">${data?.price}</span>
          {/* <p>{data?.attributes?.desc}</p> */}
          <div className="quantity">
            <button
              onClick={() =>
                setQuantity((prev) => (prev === 1 ? 1 : prev - 1))
              }
            >
              -
            </button>
            {quantity}
            <button onClick={() => setQuantity((prev) => prev + 1)}>+</button>
          </div>
          <button
            className="add"
            onClick={() =>
              dispatch(
                addToCart({
                  product_id: data.product_id,
                  name: data.name,
                  price: data.price,
                  img: data.image_url,
                  qty:quantity,
                })
              )
            }
          >
            <AddShoppingCartIcon /> ADD TO CART
          </button>
          <div className="links">
            <div className="item">
              <FavoriteBorderIcon /> ADD TO WISH LIST
            </div>
            <div className="item">
              <BalanceIcon /> ADD TO COMPARE
            </div>
          </div>
          <div className="info">
            <span>Vendor: {data.brand}</span>
            <span>Tag: {data.category}</span>
          </div>
          <hr />
          <div className="info">
            <span>DESCRIPTION</span> <span>{data.description}</span>
          </div>
        </div>
      </>
  </div>
  );
  }
 
};

export default Product;
