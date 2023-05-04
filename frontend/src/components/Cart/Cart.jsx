import React, { useState,useEffect } from "react";
import "./Cart.scss";
import { useDispatch,useSelector } from "react-redux";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { addToCart,getCart,removeFromCart,emptyCart } from "../../actions/cartActions.js";
import { makeRequest } from "../../makeRequest";
import { loadStripe } from "@stripe/stripe-js";
import { useParams } from "react-router";
import {BarLoader} from "react-spinners"
const Cart = () => {
  const cartId = localStorage.getItem('cart')
  let loading =true
  const dispatch = useDispatch();
  let products = JSON.parse(localStorage.getItem('cart')).items
  useEffect(()=>{
    dispatch(getCart())
    loading =false
    products = JSON.parse(localStorage.getItem('cart'))
    console.log(products)
    
  },[dispatch,loading,cartId]) 
  const totalPrice = () => {
    let total = 0;
    products.forEach((item) => {
      total += item.quantity * item.price;
    });
    return total.toFixed(2);
  };

  const stripePromise = loadStripe(
    "pk_test_eOTMlr8usx1ctymXqrik0ls700lQCsX2UB"
  );
  const handlePayment = async () => {
    try {
      const stripe = await stripePromise;
      const res = await makeRequest.post("/orders", {
        products,
      });
      await stripe.redirectToCheckout({
        sessionId: res.data.stripeSession.id,
      });

    } catch (err) {
      console.log(err);
    }
  };
  if(false){
    return <div className="cart"><BarLoader/></div>
  }
  else{
    return (
      <div className="cart">
        <h1>Products in your cart</h1>
        {products?.map((item) => (
          <div className="item" key={item.id}>
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
        <button onClick={handlePayment}>PROCEED TO CHECKOUT</button>
        <span className="reset" onClick={() => dispatch(emptyCart())}>
          Reset Cart
        </span>
      </div>
    );
  }
  
};

export default Cart;