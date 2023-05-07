import React from 'react'
import { Nav } from 'react-bootstrap'
import { NavLink,Link } from "react-router-dom";
import "./CheckoutSteps.scss"

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <Nav className='nav p-12'>
      <Nav.Item>
        {step1 ? (
          <NavLink className="link" to='/login'>
            Sign In
          </NavLink>
        ) : (
          <NavLink className="link" disabled>Sign In</NavLink>
        )}
      </Nav.Item>

      <Nav.Item>
        {step2 ? (
          <NavLink className="link" to='/shippingDetails'>
            Shipping
          </NavLink>
        ) : (
          <NavLink className="link" disabled>Shipping</NavLink>
        )}
      </Nav.Item>

      {/* <Nav.Item>
        {step3 ? (
          <NavLink className="link" to='/payment'>
            Payment
          </NavLink>
        ) : (
          <NavLink className="link" disabled>Payment</NavLink>
        )}
      </Nav.Item> */}

      <Nav.Item>
        {step4 ? (
          <NavLink className="link" to='/placeOrder'>
            Place Order
          </NavLink>
        ) : (
          <NavLink className="link" disabled>Place Order</NavLink>
        )}
      </Nav.Item>
    </Nav>
  )
}

export default CheckoutSteps