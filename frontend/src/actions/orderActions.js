import axios from 'axios'
import { CART_RESET } from '../constants/cartConstants.js'
import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_REQUEST,
  ORDER_PAY_FAIL,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_REQUEST,
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_SUCCESS,
  ORDER_LIST_MY_FAIL,
  ORDER_LIST_FAIL,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_REQUEST,
  ORDER_DELIVER_FAIL,
  ORDER_DELIVER_SUCCESS,
  ORDER_DELIVER_REQUEST,
} from '../constants/orderConstants.js'
import { logout } from './userActions.js'

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    const userinfo = JSON.parse(localStorage.getItem('userInfo'))
    dispatch({
      type: ORDER_CREATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userinfo.token}`,
        authToken:userinfo.token
      },
    }
    console.log(order)
    const x = await axios.post(`/api/orders/create`, {...order}, config)
    const data = x.data
    console.log(data)
    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: {...data},
    })
    dispatch({
      type: CART_RESET,
      payload: data,
    })

    const orderData  = await axios.get(`/api/orders/${data[0].order_id}`, config)
    console.log(orderData)
    localStorage.setItem('orderItems',JSON.stringify(orderData.data))
    localStorage.removeItem('order_id')
    localStorage.setItem('order_id',data[0].order_id)
    localStorage.removeItem('cartItems')
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload: message,
    })
  }
}

export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    const userinfo = JSON.parse(localStorage.getItem('userInfo'))
    dispatch({
      type: ORDER_DETAILS_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userinfo.token}`,
        authToken:userinfo.token
      },
    }

    const { data } = await axios.get(`/api/orders/${id}`, config)
    console.log(data)
    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload: message,
    })
  }
}


export const payOrder = (orderId, paymentResult) => async (
  dispatch,
  getState
) => {
  try {
    const userinfo = JSON.parse(localStorage.getItem('userInfo'))
    dispatch({
      type: ORDER_PAY_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userinfo.token}`,
        authToken:userinfo.token
      },
    }
    console.log(orderId,paymentResult)
    const { data } = await axios.put(
      `/api/orders/${orderId}/pay/${paymentResult}`,
      {},
      config
    )
      console.log("from order pay action",data)
    dispatch({
      type: ORDER_PAY_SUCCESS,
      payload: data,
    })
    localStorage.removeItem('order_id')
  } catch (error) {
    console.log("from error ",error)
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: ORDER_PAY_FAIL,
      payload: message,
    })
  }
}

export const deliverOrder = (order) => async (dispatch, getState) => {
  try {
    const userinfo = JSON.parse(localStorage.getItem('userInfo'))
    dispatch({
      type: ORDER_DELIVER_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userinfo.token}`,
        authToken:userinfo.token
      },
    }

    const { data } = await axios.put(
      `/api/orders/${order._id}/deliver`,
      {},
      config
    )

    dispatch({
      type: ORDER_DELIVER_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: ORDER_DELIVER_FAIL,
      payload: message,
    })
  }
}

export const listMyOrders = () => async (dispatch, getState) => {
  try {
    const userinfo = JSON.parse(localStorage.getItem('userInfo'))
    dispatch({
      type: ORDER_LIST_MY_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userinfo.token}`,
        authToken:userinfo.token
      },
    }

    const { data } = await axios.get(`/api/orders/user/${userinfo.user.user_id}`, config)

    dispatch({
      type: ORDER_LIST_MY_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: ORDER_LIST_MY_FAIL,
      payload: message,
    })
  }
}

export const listOrders = () => async (dispatch, getState) => {
  try {
    const userinfo = JSON.parse(localStorage.getItem('userInfo'))
    dispatch({
      type: ORDER_LIST_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userinfo.token}`,
        authToken:userinfo.token
      },
    }

    const { data } = await axios.get(`/api/orders`, config)

    dispatch({
      type: ORDER_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: ORDER_LIST_FAIL,
      payload: message,
    })
  }
}
