import React from "react";
import "./List.scss";
import { useState,useEffect } from "react";
import Card from "../Card/Card";
import useFetch from "../../hooks/useFetch";
import axios from 'axios'
import { useDispatch, useSelector } from "react-redux";
import {BarLoader} from 'react-spinners'
import { listByCategoryProducts } from "../../actions/productActions";
const List = ({ subCats, maxPrice, sort, category }) => {
  const getProductsByCategory = useSelector((state) => state.productsByCategory);
  let { loading,products, error } = getProductsByCategory
  products = products.filter((item)=>item.price<=maxPrice).sort((a,b)=> sort==='asc'?a.price-b.price:b.price-a.price)
  const dispatch = useDispatch();
 useEffect(()=>{
  dispatch(listByCategoryProducts(category))
  },[dispatch,category])
  return (
    <div className="list">
      {loading
        ? <BarLoader/>
        : products?.map((item) => <Card item={item} key={item.product_id} />)}
    </div>
  );
};

export default List;
