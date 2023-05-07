import React, { useState,useEffect } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SearchIcon from "@mui/icons-material/Search";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Link } from "react-router-dom";
import "./Navbar.scss"
import Cart from "../Cart/Cart";
import Search from "../Search/Search.jsx"
import { useDispatch,useSelector } from "react-redux";
import LogoutIcon from '@mui/icons-material/Logout';
import { logout } from "../../actions/userActions";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {getCart,persistedGetCart} from "../../actions/cartActions.js"
const Navbar = () => {
  const [open,setOpen] = useState(false)
  const [searchOpen,setSearchOpen] = useState(false)
  const dispatch = useDispatch()
  const products = useSelector((state) => state.cart)//products);
  const {cartItems} = products
  const cart = cartItems
  //const products = JSON.parse(localStorage.getItem('cart')===null?"{}":localStorage.getItem('cart')).items
  const userLogin = useSelector((state) => state.userLogin);
  const { loading,userInfo, error } = userLogin  // const userLogin = useSelector((state) => state.userLogin)
  //const userInfo = JSON.parse(localStorage.getItem('userInfo'))
  console.log(cart)
  const logoutHandler = () =>{const message = dispatch(logout())
    toast.success('Logout Successfull !', {
      position: toast.POSITION.TOP_RIGHT
  });
  }
  useEffect(()=>{
    if(userInfo){
      dispatch(getCart())
      dispatch(persistedGetCart())
      console.log("from navbar bar")
    }
    
  },[userInfo,dispatch]) 
  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="left">
          <div className="item">
            <Link className ="link" to="/products/All">Products</Link>
          </div>
          <div className="item">
            <Link className ="link" to="/products/Womens">Women's</Link>
          </div>
          <div className="item">
            <Link className ="link" to="/products/Mens">Men's</Link>
          </div>
          <div className="item">
            <Link className ="link" to="/products/New%20Season">New Season</Link>
          </div>
        </div>
        
        <div className="center">
          <Link className ="link" to="/">SHOPIFY</Link>
        </div>
        <div className="right">
          <div className="searchIcon" onClick={()=>setSearchOpen(!searchOpen)}>
            <SearchIcon/>
          </div>
          <div className="item">
            <Link className ="link" to="/">Homepage </Link>
          </div>
          <div className="item">
            <Link className ="link" to="/">About</Link>
          </div>
          <div className="item">
            <Link className ="link" to="/">Contact</Link>
          </div>
          <div className="icons">
            {/* <FavoriteBorderOutlinedIcon/> */}
            {
              userInfo?(
                <Link className="item link" onClick={logoutHandler}><LogoutIcon></LogoutIcon> LOGOUT</Link>
              ):(<>
              <Link className="item link" to="/login"><PersonOutlineOutlinedIcon/> LOGIN</Link>
            <Link className="item link" to="/register"><PersonAddAltOutlinedIcon/> REGISTER</Link>
              </>
              )
            }
            <div className="cartIcon" onClick={()=>setOpen(!open)}>
              <ShoppingCartOutlinedIcon/>
              <span>{cart!==undefined?cart.length:0}</span>
            </div>
          </div>
        </div>
      </div>
      {open && <Cart/>}
      {searchOpen && <Search/>}

    </div>
  );
};

export default Navbar;
