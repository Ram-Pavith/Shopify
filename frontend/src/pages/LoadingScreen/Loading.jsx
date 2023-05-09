import React from 'react'
import { useState, useEffect } from "react";
import styled from "styled-components";
import { mobile } from "../../responsive";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import { BarLoader } from 'react-spinners';

const LoadingPage = ()=>{

    const order_id = localStorage.getItem('order_id')
    const [loading,setLoading] =  useState(null) 
    const orderCreated = useSelector(state=>state.orderCreate)
    const {order} = orderCreated
    const navigate = useNavigate()
    useEffect(()=>{
        if(order_id!==null){
            navigate(`/order/${order_id}`)
        }
        if(order!==undefined && order.length>0){
            navigate(`/order/${order[0].order_id}`)
        }

    },[order_id,order])
    console.log(order)
    return (
        <div>
            <BarLoader/>
        </div>
    )
}
export default LoadingPage