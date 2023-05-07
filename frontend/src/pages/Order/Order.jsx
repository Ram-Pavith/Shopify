import { useDispatch,useSelector } from "react-redux";
import styled from "styled-components";
import Announcement from "../../components/Announcement/Announcement.jsx";
import { mobile } from "../../responsive.js";
import CheckoutSteps from "../../components/CheckoutSteps/CheckoutSteps.jsx"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import { getOrderDetails } from '../../actions/orderActions.js';
import { Link } from "react-router-dom";
import axios from 'axios'
import './Order.scss'
import {BarLoader} from 'react-spinners'
import {
    ORDER_PAY_RESET,
    ORDER_DELIVER_RESET,
  } from '../../constants/orderConstants.js'

const KEY = process.env.REACT_APP_STRIPE;

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
  flex: 3;

`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  margin:15px;
  background-color: #F6F6F6;
  ${mobile({ flexDirection: "column" })};
  
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
  margin-bottom:10px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.div`
    font-size: 24px;
    font-weight:100;
`;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 24px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 500;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "40px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 100;
`;

const Order = () => {
    const order_id = useParams().order_id
    const dispatch = useDispatch()
    const [sdkReady,setSdkReady] = useState(false)
    const addDecimals = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2)
      }
    let itemsPrice

    const orderDetails = useSelector(state=>state.orderDetails)
    const {loading,error,order} = orderDetails

    const orderPay = useSelector((state) => state.orderPay)
    const { loading: loadingPay, success: successPay } = orderPay
  
    const orderDeliver = useSelector((state) => state.orderDeliver)
    const { loading: loadingDeliver, success: successDeliver } = orderDeliver
  
    const userLogin = useSelector((state) => state.userLogin)
    let { userInfo } = userLogin
    userInfo = JSON.parse(localStorage.getItem('userInfo'))
    userInfo = userInfo.user
    // dispatch(getOrderDetails(order_id))
    console.log(orderDetails)
    if(!loading){
        itemsPrice = addDecimals(
            order.reduce((acc,item)=>acc+item.price*item.quantity,0)
        )
    }
    //dispatch(getOrderDetails(order_id))
    console.log(orderDetails)
    useEffect(()=>{
        const addPayPalScript = async ()=>{
            const {data:clientId} = await axios.get('/api/config/paypal')
            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.src = `src="https://www.paypal.com/sdk/js?client-id=${clientId}"`
            script.async = true
            script.onload= ()=>{
                setSdkReady(true)
            }
            document.body.appendChild(script)
        }
        dispatch(getOrderDetails(order_id))
        console.log(orderDetails)
        if (!order || successPay || successDeliver || order.order_id !== order_id) {
            dispatch({ type: ORDER_PAY_RESET })
            dispatch({ type: ORDER_DELIVER_RESET })
            dispatch(getOrderDetails(order_id))
          } else if (!order.isPaid) {
            if (!window.paypal) {
              addPayPalScript()
            } else {
              setSdkReady(true)
            }
          }
        console.log(order)
    })
    const paymentHandler = ()=>{

    }
//   let cart = useSelector((state) => state.cart);
//   cart = cart.cartItems
//   const userInfo = JSON.parse(localStorage.getItem('userInfo'))
//     const {user} = userInfo
//   let priceVar
//   let totalVar
//   let tax_price = 0.18
//   let shipping_price = 10.00 
//   let shipping_discount = 0.00
//   let quantity = cart.length
//   const address = localStorage.getItem('address')
//   const city = localStorage.getItem('city')
//   const state = localStorage.getItem('state')
//   const country = localStorage.getItem('country')
//   const [stripeToken, setStripeToken] = useState(null);
//   const navigate = useNavigate();
//   const cartDispatch = useDispatch();
//   const orderDispatch = useDispatch()
//   const orderCreateVar = useSelector(state=>state.orderCreate)
//   const order = orderCreateVar
//   const checkoutHandler = ()=>{
//     console.log(localStorage.getItem('cart_id'),user.user_id,priceVar,address,city,state,country,tax_price,shipping_price,totalVar)
//     orderDispatch(createOrder({
//       cart_id:localStorage.getItem('cart_id'),
//       user_id:user.user_id,
//       price: priceVar,
//       payment_method:'PAYPAL',
//       address:address,
//       city:city,
//       state:state,
//       country:country,
//       shipping_price:shipping_price,
//       tax_price:tax_price,
//       total:totalVar,
//       payment_method:"PAYPAL"
//   }))
//   }
//   console.log(order)
//   const onToken = (token) => {
//     setStripeToken(token);
//   };
//   const totalPrice = () => {
//     let total = 0;
//     cart.forEach((item) => {
//       total += item.quantity * item.price;
//     });
//     priceVar = total.toFixed(2)
//     totalVar = priceVar*(1.00 + tax_price) + shipping_price - shipping_discount
//     if(totalVar>(shipping_price+5000)){totalVar-=shipping_price;shipping_discount=shipping_price}
//     totalVar = totalVar.toFixed(2)
//     return total.toFixed(2);
//   };
//   totalPrice()
//   useEffect(() => {
//     const makeRequest = async () => {
//       try {
//         totalPrice()
//         // const res = await userRequest.post("/checkout/payment", {
//         //   tokenId: stripeToken.id,
//         //   amount: 500,
//         // });
//         navigate.push("/success", {
//         //   stripeData: res.data,
//           products: cart, });
//       } catch {}
//     };
//     stripeToken && makeRequest();
//   }, [stripeToken, cart.total, navigate]);
if(loading){
    return <BarLoader/>
}
else{
    return (
        <>
        <Container>
          <Announcement />
          <Wrapper>
            <Title>YOUR ORDER</Title>
            <Top>
              <TopButton type="filled"><Link className="link" to="/">CONTINUE SHOPPING</Link></TopButton>
              <TopTexts>
                <TopText>Shopping Bag({order.length})</TopText>
              </TopTexts>
              <TopButton onClick={paymentHandler} type="filled">PAY NOW</TopButton>
            </Top>
            <Bottom>
              <Info>
                {order.map((product) => (
                <div className="item" key={product.cart_item_id}>
                  <Product>
                    <ProductDetail>
                      <Image src={product.image_url} />
                      <Details>
                        <ProductName>
                          <b>Product:</b> {product.name}
                        </ProductName>
                      </Details>
                    </ProductDetail>
                    <PriceDetail>
                      <ProductAmountContainer>
                        <ProductAmount>{product.quantity}</ProductAmount>
                      </ProductAmountContainer>
                      <ProductPrice>
                        ${product.price} * {product.quantity} =   ${product.price * product.quantity}
                      </ProductPrice>
                    </PriceDetail>
                  </Product>
                </div>
    
                ))}
                <Hr />
              </Info>
              <Summary>
                <SummaryTitle>ORDER SUMMARY</SummaryTitle>
                <SummaryItem>
                  <SummaryItemText>Address :</SummaryItemText>
                  <SummaryItemText>{order[0].address}</SummaryItemText>
                </SummaryItem>
                <SummaryItem>
                  <SummaryItemText>City :</SummaryItemText>
                  <SummaryItemText>{order[0].city}</SummaryItemText>
                </SummaryItem>
                <SummaryItem>
                  <SummaryItemText>State :</SummaryItemText>
                  <SummaryItemText>{order[0].state}</SummaryItemText>
                </SummaryItem>
                <SummaryItem>
                  <SummaryItemText>Country :</SummaryItemText>
                  <SummaryItemText>{order[0].country}</SummaryItemText>
                </SummaryItem>
                <SummaryItem>
                  <SummaryItemText>Subtotal :</SummaryItemText>
                  <SummaryItemPrice>$ {itemsPrice}</SummaryItemPrice>
                </SummaryItem>
                <SummaryItem>
                  <SummaryItemText>Estimated Shipping :</SummaryItemText>
                  <SummaryItemPrice>${order[0].shipping_price}</SummaryItemPrice>
                </SummaryItem>
                <SummaryItem>
                  <SummaryItemText>Tax Rate ({order[0].tax_price}) :</SummaryItemText>
                  <SummaryItemPrice>({order[0].tax_price} * {order[0].price}) {(order[0].tax_price*order[0].price).toFixed(2)}</SummaryItemPrice>
                </SummaryItem>
                <SummaryItem type="total">
                  <SummaryItemText>Total :</SummaryItemText>
                  <SummaryItemPrice>${order[0].total}</SummaryItemPrice>
                </SummaryItem>
                  <Button type="submit" onClick={paymentHandler}>PAY NOW</Button>
              </Summary>
            </Bottom>
          </Wrapper>
        </Container>
        </>
        
      );
}
};

export default Order;