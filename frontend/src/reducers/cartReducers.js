import Cart from '../components/Cart/Cart.jsx'
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
  CART_GET,
  CART_RESET,
  CART_PERSISTED_GET,
  CART_INCREMENT,
  CART_DECREMENT,
  CART_OFFERS_APPLY
} from '../constants/cartConstants.js'
import { USER_LOGOUT } from '../constants/userConstants.js'
const cartItems= []


export const cartReducer = (
  state = { cartItems: [], shippinAddress:{},offers: [] },
  action
) => {
  switch (action.type) {
    case CART_PERSISTED_GET:
      console.log(action.payload,action.payload.cart)
      state.cartItems = [...action.payload.cart]
      return { loading: false, cartItems:[...state.cartItems] }
    case CART_ADD_ITEM:
      const item = action.payload
      console.log(item)
      const existItem = state.cartItems.find((x) => x.product_id === item.product_id)
      if (existItem) {
        item.quantity = existItem.quantity + item.quantity
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        }
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        }
      }
    case CART_OFFERS_APPLY:
      state.offers = [...action.payload]
      return{
        ...state,
        offers:state.offers
      } 
    case CART_INCREMENT:
      const incrementItem = state.cartItems.find((x)=>x.cart_item_id===action.payload)
      incrementItem.quantity+=1
      return{
        ...state,
        cartItems: state.cartItems.map((x)=>x.cart_item_id===action.payload?incrementItem:x)
      }
    case CART_DECREMENT:
      const decrementItem = state.cartItems.find((x)=>x.cart_item_id===action.payload)
      decrementItem.quantity-=1
      return{
        ...state,
        cartItems:state.cartItems.map((x)=>x.cart_item_id===action.payload?decrementItem:x)
      }
    case CART_REMOVE_ITEM:
      
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.cart_item_id !== action.payload),
      }
    case CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      }
    case CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      }
    case CART_RESET:
      state.cartItems = []
      return {
        ...state,
        cartItems: [],
      }
    case USER_LOGOUT:
      state.cartItems = []
      return {
        ...state,
        cartItems:[]
      }
    default:
      console.log(state)
      return state
  }
}

export const getCartReducer =(state={cartItems : []},action)=>{
  switch(action.type){
    case CART_GET:
      console.log(action.payload)
      state.cartItems = action.payload.cart.items
      return { loading: false, cartItems: action.payload.cart.items }
    default:
      return {...state,cartItems:[...cartItems]}
  }

}

export const resetCartReducer = (state={cartItems:[...cartItems]},action)=>{
  switch(action.type){
    case CART_RESET:
      state.cartItems = []
      return {loading:false,items:action.payload}
    default:
      return state
  }
}
