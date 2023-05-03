import React from "react";
import "./List.scss";
import { useState,useEffect } from "react";
import Card from "../Card/Card";
import useFetch from "../../hooks/useFetch";
import axios from 'axios'
import {BarLoader} from 'react-spinners'
import { listProductsByCategory } from "../../actions/productActions";
const List = ({ subCats, maxPrice, sort, category }) => {
  //const [products,setProducts] = useState([])
  //const [isLoading,setIsLoading] = useState(true)
  // let api = `http://localhost:5000/api/products/category/${category}`
  // if(category === 'All'){
  //   api = 'http://localhost:5000/api/products'
  // }
  // console.log(category)
  // useEffect(()=>{
  //   const fetchProducts = async ()=>{
  //     const data = await axios.get(api)//.then(data=>setProducts(data.data))
  //     setProducts(data.data)
  //     setIsLoading(false)
  //     console.log(products)
  //     console.log("from inside async func "+category)
  //   }
  //   fetchProducts()
  // },[category])
  //const productLists = useSelector((state)=>state.productList)
  const {loading,error,products} = listProductsByCategory(category)
  const data = products


  return (
    <div className="list">
      {loading
        ? <BarLoader/>
        : products?.map((item) => <Card item={item} key={item.product_id} />)}
    </div>
  );
};

export default List;
