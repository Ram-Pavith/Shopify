import Cart from '../components/Cart/Cart.jsx'
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
  CART_GET,
  CART_RESET
} from '../constants/cartConstants.js'
const cartItems= []


export const cartReducer = (
  state = { cartItems:[...cartItems], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    // case CART_GET:
    //   const items = action.payload
    //   state.cartItems = items
    // case CART_ADD_ITEM:
    //   const item = action.payload
    //   console.log(state.cartItems)
    //   //const existItem = state.cartItems.find((x) => x.product_id === item.product_id)
    //   return state.cartItems
    //   console.log("from cart reducer",state.cartItems)
    //   // if (existItem) {
    //   //   console.log("from if",state.cartItems)
    //   //   return {
    //   //     ...state,
    //   //     cartItems: [...state.cartItems,state.cartItems.filter((x) =>
    //   //       x.product_id !== existItem.product_id 
    //   //     )],

    //   //   }
    //   // } else {
    //   //   console.log("from else",state.cartItems)
    //   //   return {
    //   //     ...state,
    //   //     cartItems: [...state.cartItems, item],
    //   //   }
    //   // }
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
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

    default:
      return state
  }
}

export const getCartReducer =(state={cartItems},action)=>{
  switch(action.type){
    case CART_GET:
      state.cartItems = action.payload
      return { loading: false, cartItems: action.payload }
    default:
      return state
  }

}

export const resetCartReducer = (state={},action)=>{
  switch(action.type){
    case CART_RESET:
      return {loading:false,items:action.payload}
    default:
      return state
  }
}

export const addItemToCartReducer = (state={},action)=>{
  switch(action.type){
    case CART_ADD_ITEM:
      return {loading:false,items:action.payload}
    default:
      return state
  }
}