import React from "react";
import "./List.scss";
import { useState,useEffect } from "react";
import Card from "../Card/Card";
import useFetch from "../../hooks/useFetch";
import axios from 'axios'
import { useDispatch, useSelector } from "react-redux";
import {BarLoader} from 'react-spinners'
import { listProducts } from "../../actions/productActions";
const List = ({ subCats, maxPrice, sort, category }) => {
  //const [products,setProducts] = useState([])
  const [isLoading,setIsLoading] = useState(true)
  let api = `http://localhost:5000/api/products/category/${category}`
  if(category === 'All'){
    api = 'http://localhost:5000/api/products'
  }

  const getProducts = useSelector((state) => state.productList);
  const { loading,products, error } = getProducts
  const dispatch = useDispatch();
 useEffect(()=>{
  dispatch(listProducts())
  },[dispatch])

console.log(products)
  return (
    <div className="list">
      {loading
        ? <BarLoader/>
        : products?.map((item) => <Card item={item} key={item.product_id} />)}
    </div>
  );
};

export default List;
