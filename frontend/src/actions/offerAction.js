import axios from 'axios'
import {
OFFER_APPLY_REQUEST,
OFFER_APPLY_SUCCESS,
OFFER_APPLY_FAIL
}from "../constants/offerConstants.js"

export const applyOffer = (order_id)=> async(dispatch,getState)=>{
    dispatch({
        type: OFFER_APPLY_REQUEST,
      })
    const userinfo = JSON.parse(localStorage.getItem('userInfo'))
    const config = {
      headers: {
        Authorization: `Bearer ${userinfo.token}`,
        authToken: userinfo.token
      },
    }
    try{
        const {data} = await axios.post(`/api/offers/applyoffer/${order_id}`,{},config)
        dispatch({
            type:OFFER_APPLY_SUCCESS,
            payload:data,
        })
        localStorage.setItem('offers',JSON.stringify(data))
    }catch(error){
        const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    dispatch({
      type: OFFER_APPLY_FAIL,
      payload: message,
    })
    }
}
