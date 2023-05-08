import React, { useState,useEffect } from "react";
import SearchIcon from '@mui/icons-material/Search';
import styled from "styled-components";
import { useDispatch,useSelector } from "react-redux";
import { listProductDetailsByName } from "../../actions/productActions";
import { Route, Routes, useNavigate } from 'react-router-dom';
import "./Search.scss"
const Search = ()=>{
    const [searchString,setSearchString] = useState("")
    const Form = styled.form`
            display: flex;
            flex-direction: column;
        `;
    const Input = styled.input`
    flex: 1;
    min-width: 40%;
    margin: 10px 0;
    padding: 10px;
    `;
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const getProduct = useSelector(state=>state.productDetailsByName)
    const {product} = getProduct
    const submitHandler = (e)=>{
        e.preventDefault()
        console.log(e.target[0].value)
        setSearchString(e.target[0].value)
        if(true){
            dispatch(listProductDetailsByName(searchString))
            console.log(product)
            //navigate(`product/${product.product_id}`)
        }
    }
    return(
        <div className="search">
            <Form className="searchBar" inline onSubmit={submitHandler}>
                {/* <div className="searchBar"> */}
                    <input placeholder="Search Product" id="searchQueryInput" type="text" ></input>
                    <button id="searchQuerySubmit" type="submit" name="searchQuerySubmit"><SearchIcon></SearchIcon></button>
                {/* </div> */}
            </Form>
        </div>
    )
}
export default Search