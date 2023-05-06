import React, { useState,useEffect } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SearchIcon from "@mui/icons-material/Search";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Link } from "react-router-dom";
import "./Navbar.scss"
import Cart from "../Cart/Cart";
import { useDispatch,useSelector } from "react-redux";
import LogoutIcon from '@mui/icons-material/Logout';
import { logout } from "../../actions/userActions";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Navbar = () => {
  const [open,setOpen] = useState(false)
  const dispatch = useDispatch()
  const products = useSelector((state) => state.cart.products);
  const userLogin = useSelector((state) => state.userLogin);
  const { loading,userInfo, error } = userLogin  // const userLogin = useSelector((state) => state.userLogin)
  // const { userinfo } = userLogin
  const logoutHandler = () =>{const message = dispatch(logout())
    toast.success('Logout Successfull !', {
      position: toast.POSITION.TOP_RIGHT
  });
  }
  useEffect(()=>{
  },[userInfo]) 
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
          <div className="icons">
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
              {/* <span>{products.length}</span> */}
            </div>
          </div>
        </div>
      </div>
      {open && <Cart/>}
    </div>
  );
};

export default Navbar;
