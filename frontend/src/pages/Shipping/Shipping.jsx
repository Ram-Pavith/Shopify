import React from 'react'
import { useState, useEffect } from "react";
import styled from "styled-components";
import { login } from '../../actions/userActions';
import { mobile } from "../../responsive";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.05),
      rgba(255, 255, 255, 0.25)
    ),
    url("https://images.pexels.com/photos/5025510/pexels-photo-5025510.jpeg?auto=compress&cs=tinysrgb&w=1600")
      center;
  background-size: 100vw 200vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

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

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  &:disabled {
    color: green;
    cursor: not-allowed;
  }
`;

// const Link = styled.a`
//   margin: 5px 0px;
//   font-size: 12px;
//   text-decoration: underline;
//   cursor: pointer;
// `;

const Error = styled.span`
  color: red;
`;

const Shipping = (location,history) => {
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { loading,userInfo, error } = userLogin

  const redirect = "/"//location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if (userInfo) {
      //history.push(redirect)
    }
  }, [ history,userInfo, redirect])

  const handleClick = (e) => {
    e.preventDefault();
    localStorage.setItem('address',address)
    localStorage.setItem('city',city)
    localStorage.setItem('state',state)
    localStorage.setItem('country',country)
    //const{userInfo,loading,error} = dispatch(login(username, password ));
    navigate('/order')
    console.log(userInfo)

  };
  return (
    <Container>
      <Wrapper>
        <Title>SHIPPING DETAILS</Title>
        <Form onSubmit={handleClick}>
          <Input
            autoFocus
            placeholder="Address"
            onChange={(e) => setAddress(e.target.value)}
          />
          <Input
            placeholder="City"
            onChange={(e) => setCity(e.target.value)}
          />
          <Input
            placeholder="State"
            onChange={(e) => setState(e.target.value)}
          />
          <Input
            placeholder="Country"
            onChange={(e) => setCountry(e.target.value)}
          />
          <Button onClick={handleClick} >{/*disabled={true}> {/*isFetching}>*/}
            Proceed To Order
          </Button>
          {/* {error && <Error>Something went wrong...</Error>} */}
          {/* <Link>DO NOT YOU REMEMBER THE PASSWORD?</Link> */}
          <Link className='link' to="/register">CREATE A NEW ACCOUNT</Link>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Shipping;