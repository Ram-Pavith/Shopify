import React, { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SearchIcon from "@mui/icons-material/Search";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Link } from "react-router-dom";
import "./Navbar.scss"
import Cart from "../Cart/Cart";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [open,setOpen] = useState(false)
  const products = useSelector((state) => state.cart.products);

  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="left">
          {/* <div className="item">
            <img src="/img/en.png" alt="" />
            <KeyboardArrowDownIcon />
          </div>
          <div className="item">
            <span>USD</span>
            <KeyboardArrowDownIcon />
          </div> */}
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
            <Link className ="link" to="/">Homepage</Link>
          </div>
          <div className="item">
            <Link className ="link" to="/">About</Link>
          </div>
          <div className="item">
            <Link className ="link" to="/">Contact</Link>
          </div>
          <div className="icons">
            {/* <FavoriteBorderOutlinedIcon/> */}
            <Link className="item link" to="/login"><PersonOutlineOutlinedIcon/> LOGIN</Link>
            <Link className="item link" to="/register"><PersonAddAltOutlinedIcon/> REGISTER</Link>
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
