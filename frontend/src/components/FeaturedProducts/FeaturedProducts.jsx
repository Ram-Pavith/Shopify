import React from "react";
import Card from "../Card/Card";
import "./FeaturedProducts.scss";
import useFetch from "../../hooks/useFetch";
import { useState,useEffect } from "react";
import {BarLoader} from 'react-spinners'
import axios from 'axios'


const FeaturedProducts = ({ type }) => {
  console.log(type)
    // const { products, loading, error } = useFetch(
    //   `/api/products/category/${type}`
    // );
    // const data = products
    //   console.log(data)
  // if(type==='Trending'){
  //   const { data, loading, error } = useFetch(
  //     `/api/products/`
  //   );
  //   data.filter((x)=>x.num_reviews>4.5)
  // }

  const [products,setProducts] = useState([])
  const [isLoading,setIsLoading] = useState(true)
  let api = `http://localhost:5000/api/products/category/${type}`
  console.log(type)
  useEffect(()=>{
    const fetchProducts = async ()=>{
      const data = await axios.get(api)//.then(data=>setProducts(data.data))
      setProducts(data.data.slice(0,4))
      setIsLoading(false)
      console.log(products)
      console.log("from inside async func "+type)
    }
    fetchProducts()
  },[type])

  return (
    <div className="featuredProducts">
      <div className="top">
        <h1>{type} products</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum
          suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan
          lacus vel facilisis labore et dolore magna aliqua. Quis ipsum
          suspendisse ultrices gravida. Risus commodo viverra maecenas.
        </p>
      </div>
      <div className="bottom">
        {
           isLoading
          ? <BarLoader/>
          : products?.map((item) => <Card item={item} key={item.id} />)}
      </div>
    </div>
  );
};

export default FeaturedProducts;
