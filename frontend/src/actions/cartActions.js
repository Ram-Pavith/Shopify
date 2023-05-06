import axios from 'axios'
import {v4} from 'uuid'
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
  CART_GET,
  CART_RESET
} from '../constants/cartConstants.js'

export const addToCart = ({product_id, quantity}) => async (dispatch, getState) => {
  console.log(product_id,quantity)
  const userinfo = JSON.parse(localStorage.getItem('userInfo'))
  const config = {
    headers: {
      Authorization: `Bearer ${userinfo.token}`,
      authToken: userinfo.token
    },
  }
  const { data } = await axios.post(`http://localhost:5000/api/cart/add`,{product_id,quantity:quantity},config)
  console.log(data,data.data,data.data[0].product_id)
  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product_id: data.data[0],product_id,
      name: data.data[0].name,
      image_url: data.data[0].image_url,
      price: data.data[0].price,
      count_in_stock: data.data[0].count_in_stock,
      quantity:data.data[0].qty,
    },
  })

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}


export const getCart =  ()=> async(dispatch, getState)=>{
  const userinfo = JSON.parse(localStorage.getItem('userInfo'))
  const config = {
    headers: {
      Authorization: `Bearer ${userinfo.token}`,
      authToken:userinfo.token
    },
  }
  const {data} = await axios.get('/api/cart',config)
  dispatch({
    type:CART_GET,
    payload:{
      cart:data
    }
  })
  console.log(data)
  localStorage.setItem('cart',JSON.stringify(data))
}

export const removeFromCart = (id) => async(dispatch, getState) => {
  const userinfo = JSON.parse(localStorage.getItem('userInfo'))
  const config = {
    headers: {
      Authorization: `Bearer ${userinfo.token}`,
      authToken:userinfo.token
    },
  }
  const {data:items} = await axios.delete('/api/cart',config)
  

  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  })

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: data,
  })

  localStorage.setItem('shippingAddress', JSON.stringify(data))
}

export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: data,
  })

  localStorage.setItem('paymentMethod', JSON.stringify(data))
}

export const emptyCart = ()=>async (dispatch,getState)=>{
  const userinfo = JSON.parse(localStorage.getItem('userInfo'))
  const config = {
    headers: {
      Authorization: `Bearer ${userinfo.token}`,
      authToken:userinfo.token
    },
  }
  console.log(userinfo.token)
  const {data:items} = await axios.get('/api/cart/clear',config)
  localStorage.setItem('cart',"{}")
  dispatch({
    type:CART_RESET,
    payload:{
      cart:items
    }
  })
}