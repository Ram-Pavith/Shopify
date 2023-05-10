import React from 'react'
import { useState, useEffect } from "react";
import styled from "styled-components";
import { login } from '../../actions/userActions';
import { mobile } from "../../responsive";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import {toast,ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.05),
      rgba(255, 255, 255, 0.25)
    ),
    url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  display: flex;
  background-size:cover;
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

const Login = (location,history) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const errorToast = ()=>toast.error('Wrong Email or Password')
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
    dispatch(login(email, password))
    console.log(email)
    console.log(password)
    if(error){
      console.log(error)
      toast.error(error, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
    }
    //const{userInfo,loading,error} = dispatch(login(username, password ));
    if(!error){
      toast.success("Login Successfull",{
      position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",})
      navigate('/')
    }
    console.log(userInfo)
 
  };
  return (
    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form onSubmit={handleClick}>
          <Input
            autoFocus
            placeholder="Email Address"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={handleClick} >{/*disabled={true}> {/*isFetching}>*/}
            LOGIN
          </Button>
          <ToastContainer/>
          {/* {error && <Error>Something went wrong...</Error>} */}
          {/* <Link>DO NOT YOU REMEMBER THE PASSWORD?</Link> */}
          <Link className='link' to="/register">CREATE A NEW ACCOUNT</Link>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;
