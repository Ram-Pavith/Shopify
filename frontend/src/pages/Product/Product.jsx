import React from "react";
import { useState } from "react";
import "./Product.scss";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import BalanceIcon from "@mui/icons-material/Balance";
import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../actions/cartActions.js";
import { listProductDetails } from "../../actions/productActions";
import axios from 'axios'
import { BarLoader } from "react-spinners";
const Product = () => {
  const id = useParams().product_id;
  console.log(id)
  const [selectedImg, setSelectedImg] = useState("img");
  const [quantity, setQuantity] = useState(1);
  // const [product,setProduct] = useState({})
  // const [loading,setLoading] = useState(true)
  const dispatch = useDispatch()
  const {data,isLoading:loading,error} = listProductDetails()
  // const x = async () =>{
  //   const { data } = await axios.get(`http://localhost:5000/api/products/${id}`)
  //   console.log(data)
  //   //setProduct(data)
  //   // setLoading(false)
  // }
  //x()
  // const data = product
  //dispatch(listProductDetails(id)).then(data=>console.log(data))//useFetch(`/products/${id}`);
  //console.log(data)
  //console.log(listProductDetails(id))

  if(loading){
    return <BarLoader/>
  }
  else{
     return (
    <div className="product">
        {/* <>
          <div className="left">
            <div className="images">
              <img
                src={
                  data.image_url
                }
                alt=""
                onClick={(e) => setSelectedImg("img")}
              />
            </div>
            <div className="mainImg">
              <img
                src={
                  process.env.REACT_APP_UPLOAD_URL +
                  data?.attributes[selectedImg]?.data?.attributes?.url
                }
                alt=""
              />
            </div>
          </div>
          <div className="right">
            <h1>{data?.attributes?.title}</h1>
            <span className="price">${data?.attributes?.price}</span>
            <p>{data?.attributes?.desc}</p>
            <div className="quantity">
              <button
                onClick={() =>
                  setQuantity((prev) => (prev === 1 ? 1 : prev - 1))
                }
              >
                -
              </button>
              {quantity}
              <button onClick={() => setQuantity((prev) => prev + 1)}>+</button>
            </div>
            <button
              className="add"
              onClick={() =>
                dispatch(
                  addToCart({
                    id: data.id,
                    title: data.attributes.title,
                    desc: data.attributes.desc,
                    price: data.attributes.price,
                    img: data.attributes.img.data.attributes.url,
                    quantity,
                  })
                )
              }
            >
              <AddShoppingCartIcon /> ADD TO CART
            </button>
            <div className="links">
              <div className="item">
                <FavoriteBorderIcon /> ADD TO WISH LIST
              </div>
              <div className="item">
                <BalanceIcon /> ADD TO COMPARE
              </div>
            </div>
            <div className="info">
              <span>Vendor: Polo</span>
              <span>Product Type: T-Shirt</span>
              <span>Tag: T-Shirt, Women, Top</span>
            </div>
            <hr />
            <div className="info">
              <span>DESCRIPTION</span>
              <hr />
              <span>ADDITIONAL INFORMATION</span>
              <hr />
              <span>FAQ</span>
            </div>
          </div>
        </> */}
    </div>
  );
  }
 
};

export default Product;
