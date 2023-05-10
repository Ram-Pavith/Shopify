import { useDispatch,useSelector } from "react-redux";
import styled from "styled-components";
import Announcement from "../../components/Announcement/Announcement.jsx";
import { mobile } from "../../responsive.js";
import CheckoutSteps from "../../components/CheckoutSteps/CheckoutSteps.jsx"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import { getOrderDetails,payOrder,deliverOrder } from '../../actions/orderActions.js';
import { Link } from "react-router-dom";
import axios from 'axios'
import './Order.scss'
import {BarLoader} from 'react-spinners'
import {toast,ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {PayPalScriptProvider,PayPalButtons} from '@paypal/react-paypal-js'
import {
    ORDER_PAY_RESET,
    ORDER_DELIVER_RESET,
  } from '../../constants/orderConstants.js'
import { applyOffer } from "../../actions/offerAction.js";

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
    let order_id = useParams().order_id
    while(order_id===null)order_id = localStorage.getItem('order_id')
    const dummy = (localStorage.getItem('order_id'))
    const dummyOffers = localStorage.getItem('offers')
    console.log(order_id)
    const OfferDispatch = useDispatch()
    const dispatch = useDispatch()
    const [sdkReady,setSdkReady] = useState(false)
    const addDecimals = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2)
      }
    let itemsPrice
      const navigate = useNavigate()
    const orderDetails = useSelector(state=>state.orderDetails)
    let {loading:orderDetailsLoading,error,order} = orderDetails
     //const orderDetails = JSON.parse(localStorage.getItem('orderItems'))
    // const order = orderDetails
     const offerApply = useSelector(state=>state.applyOffer)
     const {loading:offersLoading,offers} = offerApply
     console.log("Offers Applied : ",offerApply)
     //let loading = false
    const orderPay = useSelector((state) => state.orderPay)
    const { loading: loadingPay, success: successPay } = orderPay
  
    const orderDeliver = useSelector((state) => state.orderDeliver)
    const { loading: loadingDeliver, success: successDeliver } = orderDeliver
  
    const userLogin = useSelector((state) => state.userLogin)
    let { userInfo } = userLogin
      
    const x = async()=>await axios.get('/api/config/paypal')
    //   const {data:clientId} = x()
    const clientId = "AZouWH9pB7bJGdVFI9osFLnqb_1HagcB8lcHxiGzbrqNHy9X4C7p2PwTnO1k6zx-kP2pq5NZJC6HmKe0"
    //dispatch(getOrderDetails(order_id))
    //OfferDispatch(applyOffer(order_id))

    if(!orderDetailsLoading){
        itemsPrice = addDecimals(
            order.reduce((acc,item)=>acc+item.price*item.quantity,0)
        )
    }
    // dispatch())

   //dispatch(getOrderDetails(order_id))
   
   useEffect(()=>{
       dispatch(getOrderDetails(order_id))
        OfferDispatch(applyOffer(order_id))
    },[dispatch,OfferDispatch,order_id,userInfo,dummy,dummyOffers])
    console.log(orderDetails)
    console.log(order)
    console.log(offers)
    const paymentHandler = (status)=>{   
        console.log(status)
        localStorage.setItem('payment_status',status) 
        if(status==='COMPLETED'){
          dispatch(payOrder(order[0].order_id,status))
          if(!loadingPay && successPay){
            toast.success("Payment Successfull",{
              position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",})  
            navigate("/")
          }
        }
        else{
          dispatch(payOrder(order[0].order_id,status))
          if(!loadingPay && successPay){
            toast.error("Payment Failed",{
              position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",})  
          }
        }
        
    }
   

if(orderDetailsLoading||offersLoading){
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
                <div className="item" key={product.product_id}>
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
                        <ProductAmount><b>Quantity: </b>{product.quantity}</ProductAmount>
                      </ProductAmountContainer>
                      <ProductAmountContainer>
                        <ProductAmount><b>Discount: </b>{product.discount}%</ProductAmount>
                      </ProductAmountContainer>
                      <ProductPrice>
                       <b>Price: </b> $<span className="oldPrice">{product.price}  </span>{(product.price*((100-product.discount)/100))} * {product.quantity} =   ${(product.price*((100-product.discount)/100)) * product.quantity}
                      </ProductPrice>
                    </PriceDetail>
                  </Product>
                </div>
    
                ))}
                <Hr />
              </Info>
              <Summary>
                <SummaryTitle>OFFERS APPLIED</SummaryTitle>
                {offers.map((off)=>(
                    <div className="item" key={off.offer_id}>
                        <SummaryItem>
                            <SummaryItemText>OFFER: {off.name}</SummaryItemText>
                        </SummaryItem>
                        <SummaryItem>
                            <SummaryItemText>DISCOUNT: {off.discount}</SummaryItemText>
                        </SummaryItem>
                    </div>
                ))}
                
              </Summary>
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
                  <SummaryItemPrice>${parseFloat(order[0].total).toFixed(2)}</SummaryItemPrice>
                </SummaryItem>
                  <Button type="submit" onClick={paymentHandler}>PAY NOW</Button>
                  <PayPalScriptProvider options={{"client-id":clientId}}>
                    <PayPalButtons style={{
                        color:"silver",
                        layout:"horizontal",
                        height:48,
                        tagline:false,
                    }}
                    onClick={(data,actions)=>{
                        return actions.resolve()
                    }}
                    createOrder={(data,actions)=>{
                        return actions.order.create({
                            purchase_units:[
                                {
                                    description:order.description,
                                    amount:{
                                        value:parseFloat(order[0].total).toFixed(2)
                                    }
                                }
                            ]
                        });
                    }}
                    onApprove={async (data,actions)=>{
                        const neworder = await actions.order.capture();
                        console.log("order",neworder)
                        localStorage.setItem('payment_status',neworder.status)
                       // dispatch(payOrder(neworder.status))
                        paymentHandler(neworder.status)
                    }}
                    onError={(err)=>{
                        console.log("PayPal checkout error",err)
                        paymentHandler(err)
                    }}
                    ></PayPalButtons>
                  </PayPalScriptProvider>
                  <ToastContainer/>
              </Summary>
            </Bottom>
          </Wrapper>
        </Container>
        </>
        
      );
}
};

export default Order;