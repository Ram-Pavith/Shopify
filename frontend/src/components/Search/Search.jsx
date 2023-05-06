import React, { useState,useEffect } from "react";
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch,useSelector } from "react-redux";
import { Route, Routes, useNavigate } from 'react-router-dom';
import "./Search.scss"
const Search = ()=>{
    return(
        <div className="search">
            <div className="searchBar">
                <input placeholder="Search Product" id="searchQueryInput" type="search"></input>
                <button id="searchQuerySubmit" type="submit" name="searchQuerySubmit"><SearchIcon></SearchIcon></button>
            </div>
        </div>
    )
}
export default Search