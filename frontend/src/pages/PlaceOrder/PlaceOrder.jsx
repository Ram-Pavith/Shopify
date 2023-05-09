import AddIcon from '@mui/icons-material/Add';
import { useDispatch,useSelector } from "react-redux";
import RemoveIcon from '@mui/icons-material/Remove';
import styled from "styled-components";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import Announcement from "../../components/Announcement/Announcement.jsx";
import { mobile } from "../../responsive.js";
import {removeFromCart,incrementQuantityCart,decrementQuantityCart, applyOfferCart} from '../../actions/cartActions.js'
// import StripeCheckout from "react-stripe-checkout";
import CheckoutSteps from "../../components/CheckoutSteps/CheckoutSteps.jsx"
import { useEffect, useState } from "react";
import {createOrder} from "../../actions/orderActions.js"
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import {BarLoader} from "react-spinners"
import './PlaceOrder.scss'
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

const PlaceOrder = () => {
  let cart = useSelector((state) => state.cart);
  cart = cart.cartItems
  const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    const {user} = userInfo
  let priceVar
  let totalVar
  let tax_price = 0.18
  let shipping_price = 10.00 
  let shipping_discount = 0.00
  let quantity = cart.length
  const address = localStorage.getItem('address')
  const city = localStorage.getItem('city')
  const state = localStorage.getItem('state')
  const country = localStorage.getItem('country')
  const [stripeToken, setStripeToken] = useState(null);
  let offerDetails = useSelector(store=>store.cart)
  const {offers:offersApplied,loading:offersLoading,error:offerError} = offerDetails 
  const navigate = useNavigate();
  const cartDispatch = useDispatch();
  const orderDispatch = useDispatch()
useEffect(()=>{
cartDispatch(applyOfferCart())
if(offersApplied!==undefined){
  localStorage.setItem('offersApplied',JSON.stringify(offersApplied))
}
},[cart])

  const orderCreateVar = useSelector(state=>state.orderCreate)
  const {loading,order} = orderCreateVar
  console.log(offerDetails,offerDetails.offers)

  const checkoutHandler = ()=>{
    console.log(localStorage.getItem('cart_id'),user.user_id,priceVar,address,city,state,country,tax_price,shipping_price,totalVar)
    orderDispatch(createOrder({
      cart_id:localStorage.getItem('cart_id'),
      user_id:user.user_id,
      price: priceVar,
      payment_method:'PAYPAL',
      address:address,
      city:city,
      state:state,
      country:country,
      shipping_price:shipping_price,
      tax_price:tax_price,
      total:totalVar,
      payment_method:"PAYPAL"
  }))
  console.log(order)
  if(order){
    console.log("inside loop")
    navigate(`/order/${localStorage.getItem('order_id')}`)
  }
  }
  const onToken = (token) => {
    setStripeToken(token);
  };
  const totalPrice = () => {
    let total = 0;
    cart.forEach((item) => {
      total += item.quantity * item.price;
    });
    priceVar = total.toFixed(2)
    totalVar = priceVar*(1.00 + tax_price) + shipping_price - shipping_discount
    if(totalVar>(shipping_price+5000)){totalVar-=shipping_price;shipping_discount=shipping_price}
    totalVar = totalVar.toFixed(2)
    return total.toFixed(2);
  };
  const offers = JSON.parse(localStorage.getItem('offersApplied'))

  totalPrice()
  useEffect(() => {
    const makeRequest = async () => {
      try {
        totalPrice()
        // const res = await userRequest.post("/checkout/payment", {
        //   tokenId: stripeToken.id,
        //   amount: 500,
        // });
        navigate.push("/success", {
        //   stripeData: res.data,
          products: cart, });
      } catch {}
    };
    stripeToken && makeRequest();
  }, [stripeToken, cart.total, navigate]);

  // if(offersLoading){
  //   return <BarLoader/>
  // }
  // else{
    return (
      <>
      <CheckoutSteps step1 step2 step4/>
      <Container>
        <Announcement />
        <Wrapper>
          <Title>YOUR ORDER</Title>
          <Top>
            <TopButton type="filled"><Link className="link" to="/">CONTINUE SHOPPING</Link></TopButton>
            <TopTexts>
              <TopText>Shopping Bag({quantity})</TopText>
            </TopTexts>
            <TopButton onClick={checkoutHandler} type="filled">CHECKOUT NOW</TopButton>
          </Top>
          <Bottom>
            <Info>
              {cart.map((product) => (
              <div className="item" key={product.cart_item_id}>
                <Product>
                  <ProductDetail>
                    <Image src={product.image_url} />
                    <Details>
                      <ProductName>
                        <b>Product:</b> {product.name}
                      </ProductName>
                      <DeleteOutlinedIcon className="delete" 
                      onClick={() => cartDispatch(removeFromCart(product.cart_item_id))}></DeleteOutlinedIcon>
                      {/* <ProductId>
                        <b>ID:</b> {product.product_id}
                      </ProductId> */}
                    </Details>
                  </ProductDetail>
                  <PriceDetail>
                    <ProductAmountContainer>
                      <AddIcon className='increment' onClick={()=>cartDispatch(incrementQuantityCart(product.cart_item_id))}/>
                      <ProductAmount><b>Quantity: </b>{product.quantity}</ProductAmount>
                      <RemoveIcon className='decrement' onClick={()=>cartDispatch(decrementQuantityCart(product.cart_item_id))}/>
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
                <SummaryItemText>{address}</SummaryItemText>
              </SummaryItem>
              <SummaryItem>
                <SummaryItemText>City :</SummaryItemText>
                <SummaryItemText>{city}</SummaryItemText>
              </SummaryItem>
              <SummaryItem>
                <SummaryItemText>State :</SummaryItemText>
                <SummaryItemText>{state}</SummaryItemText>
              </SummaryItem>
              <SummaryItem>
                <SummaryItemText>Country :</SummaryItemText>
                <SummaryItemText>{country}</SummaryItemText>
              </SummaryItem>
              <SummaryItem>
                <SummaryItemText>Subtotal :</SummaryItemText>
                <SummaryItemPrice>$ {cart[0].total}</SummaryItemPrice>
              </SummaryItem>
              <SummaryItem>
                <SummaryItemText>Estimated Shipping :</SummaryItemText>
                <SummaryItemPrice>${shipping_price}</SummaryItemPrice>
              </SummaryItem>
              <SummaryItem>
                <SummaryItemText>Shipping Discount :</SummaryItemText>
                <SummaryItemPrice>- ${shipping_discount}</SummaryItemPrice>
              </SummaryItem>
              <SummaryItem>
                <SummaryItemText>Tax Rate ({tax_price}) :</SummaryItemText>
                <SummaryItemPrice>({tax_price} * {priceVar}) {(tax_price*priceVar).toFixed(2)}</SummaryItemPrice>
              </SummaryItem>
              <SummaryItem type="total">
                <SummaryItemText>Total :</SummaryItemText>
                <SummaryItemPrice>${totalVar}</SummaryItemPrice>
              </SummaryItem>
              {/* <StripeCheckout
                name="Lama Shop"
                image="https://avatars.githubusercontent.com/u/1486366?v=4"
                billingAddress
                shippingAddress
                description={`Your total is $${cart.total}`}
                amount={cart.total * 100}
                token={onToken}
                stripeKey={KEY}
              > */}
                <Button type="submit" onClick={checkoutHandler}>CHECKOUT NOW</Button>
              {/* </StripeCheckout> */}
            </Summary>
          </Bottom>
        </Wrapper>
      </Container>
      </>
      
    );
  //}
  
};

export default PlaceOrder;