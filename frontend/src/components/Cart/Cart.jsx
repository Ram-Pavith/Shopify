import React, { useState,useEffect } from "react";
import "./Cart.scss";
import { useDispatch,useSelector } from "react-redux";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { addToCart,getCart,removeFromCart,emptyCart } from "../../actions/cartActions.js";
import { makeRequest } from "../../makeRequest";
import { loadStripe } from "@stripe/stripe-js";
import { useParams } from "react-router";
import {BarLoader} from "react-spinners"
import {createOrder} from "../../actions/orderActions"
import { Route, Routes, useNavigate } from 'react-router-dom';
const Cart = () => {
  const cartId = localStorage.getItem('cart')
  // let loading =true
  let totalPriceVar
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const orderDispatch = useDispatch()
  const orderCreateVar = useSelector(state=>state.orderCreate)
  const order = orderCreateVar
  let cart = useSelector(store => store.cart)
  let {loading,error,items} = cart
  let products = items
  //let products = JSON.parse(localStorage.getItem('cart')===null?"{}":localStorage.getItem('cart')).items
  console.log(products)
  useEffect(()=>{
    dispatch(getCart())
    loading =false
    //products = JSON.parse(localStorage.getItem('cart')===null?"{}":localStorage.getItem('cart'))
    //console.log(products)
    
  },[orderDispatch,dispatch,loading,cartId]) 
  const totalPrice = () => {
    let total = 0;
    products.forEach((item) => {
      total += item.quantity * item.price;
    });
    totalPriceVar = total.toFixed(2)
    return total.toFixed(2);
  };

  const stripePromise = loadStripe(
    "pk_test_eOTMlr8usx1ctymXqrik0ls700lQCsX2UB"
  );
  const temp = [products]
  const OrderPage = async () => {
    if(localStorage.getItem('userInfo')===undefined||localStorage.getItem('userInfo')===null){
      navigate("/login")
    }
    console.log("to order")
//     orderDispatch(createOrder({
//       cart_id:localStorage.getItem('cart_id'),
//       price: totalPriceVar,
//       payment_method:'PAYPAL',
//       quantity:temp.length
//   })
//  )
 console.log(order)
 navigate("/order") 
}

   

  if(products===null){
    return <div className="cart"><BarLoader/></div>
  }
  if(products===""||products===undefined){
    return <div className="cart">
      <div className="item">
        <p>Cart is Empty</p>
      </div>
    </div>

  }
  else{
    return (
      <div className="cart">
        <h1>Products in your cart</h1>
        {products?.map((item) => (
          <div className="item" key={item.product_id}>
            <img src={item.image_url} alt="" />
            <div className="details">
              <h1>{item.name}</h1>
              <p>{item.desc?.substring(0, 100)}</p>
              <div className="price">
                {item.quantity} x ${item.price}
              </div>
            </div>
            <DeleteOutlinedIcon
              className="delete"
              onClick={() => dispatch(removeFromCart(item.id))}
            />
          </div>
        ))}
        <div className="total">
          <span>SUBTOTAL</span>
          <span>${totalPrice()}</span>
        </div>
        <button onClick={()=>OrderPage()}>PROCEED TO ORDER</button>
        <span className="reset" onClick={() => dispatch(emptyCart())}>
          Reset Cart
        </span>
      </div>
    );
  }

};

export default Cart;