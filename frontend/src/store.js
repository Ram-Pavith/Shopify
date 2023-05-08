import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
// import { AsyncStorage } from 'react-native'
import { configureStore } from "@reduxjs/toolkit";
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  productListReducer,
  productDetailsReducer,
  productDetailsByNameReducer,
  productDeleteReducer,
  productCreateReducer,
  productUpdateReducer,
  productReviewCreateReducer,
  productByCategoryListReducer,
} from './reducers/productReducers.js'
import { cartReducer,getCartReducer,resetCartReducer,addItemToCartReducer } from './reducers/cartReducers.js'
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
} from './reducers/userReducers.js'
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderPayReducer,
  orderDeliverReducer,
  orderListMyReducer,
  orderListReducer,
} from './reducers/orderReducers.js'

import {applyOfferReducer} from "./reducers/offerReducer.js"

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
// import AsyncStorage from '@react-native-community/async-storage';
import AsyncStorage from '@react-native-async-storage/async-storage'
const reducer = combineReducers({
  applyOffer:applyOfferReducer,
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productDetailsByName: productDetailsByNameReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  productReviewCreate: productReviewCreateReducer,
  productsByCategory: productByCategoryListReducer,
  cart: cartReducer,
  getCartItems:getCartReducer,
  resetCart:resetCartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderDeliver: orderDeliverReducer,
  orderListMy: orderListMyReducer,
  orderList: orderListReducer,
})

const persistConfig = {
  key: "root",
  version: 1,
  storage:AsyncStorage,
};

const persistor = persistReducer(persistConfig, reducer);

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : []
const cartFromStorage = localStorage.getItem('cart')?JSON.parse(localStorage.getItem('cart')):[]
console.log("form store",cartFromStorage)

const orderItemsFromStorage = localStorage.getItem('orderItems')?JSON.parse(localStorage.getItem('orderItems')):[]

const cartIdFromStorage = localStorage.getItem('cart_id')?localStorage.getItem('card_id'):null

const orderIdFromStorage = localStorage.getItem('order_id')?localStorage.getItem('order_id'):null

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : {}

const initialState = {
  cart: {
    cartItems: cartFromStorage,
    shippingAddress: shippingAddressFromStorage,
  },
  userLogin: { userInfo: userInfoFromStorage },
}

const middleware = [thunk]

export const store = configureStore({
  reducer:persistor,
  initialState,
  middleware:middleware,
  devTools:true,

  //composeWithDevTools(applyMiddleware(...middleware))
})

// export {persistor, store}

export let persiststore = persistStore(store);
