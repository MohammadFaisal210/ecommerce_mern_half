import React from 'react'
import "./confirmOrder.css"
import CheckoutSteps from './CheckoutSteps'
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { Typography } from "@material-ui/core"


function ConfirmOrder({ history }) {
    const { shippingInfo, cartItems } = useSelector(state => state.cart)
    const { user } = useSelector(state => state.user)


    const subtotal = cartItems.reduce(
        (acc, item) => acc + item.quantity * item.price,
        0
    )

    const shippingCharge = subtotal > 100 ? 0 : 5;

    const tax = subtotal * 0.3;

    const totalPrice = subtotal + tax + shippingCharge;

    const address = `${shippingInfo.address},${shippingInfo.city},${shippingInfo.state},${shippingInfo.pinCode},${shippingInfo.country}`

    const proceedToPayment = () => {
        const data = {
            subtotal,
            shippingCharge,
            tax,
            totalPrice
        }
        sessionStorage.setItem("orderInfo", JSON.stringify(data))
        history.push("/process/payment")
    }

    return (
        <div className="ordrePage">
            <div className="container">
                <CheckoutSteps activeStep={1} />
                <div className="confirmBox">
                    <div className="orderLeft">
                        <Typography>Shipping information</Typography>
                        <div className="confirmInfo">
                            <div>
                                <p>Name :</p>
                                <span> {user.name}</span>
                            </div>
                            <div>
                                <p>phone :</p>
                                <span> {shippingInfo.phoneNo}</span>
                            </div>
                            <div>
                                <p>Address:</p>
                                <span> {address}</span>
                            </div>
                        </div>
                        <div className='confirmDetails'>
                            <Typography>Your cart Items:</Typography>
                            {
                                cartItems &&
                                cartItems.map((item) => (
                                    <div key={item.product}>
                                        <img src={item.image} alt="Product" />
                                        <Link to={`/product/${item.product}`}>
                                            {item.name}
                                        </Link>
                                        <span>
                                            {item.quantity} X ${item.price} =
                                            <b>${item.price * item.quantity}</b>
                                        </span>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className="orderSummary">
                        <Typography>Order Sumary</Typography>
                        <div>
                            <div>
                                <p>Subtotal : </p>
                                <span>${subtotal}</span>
                            </div>
                            <div>
                                <p>Shipping Charge :</p>
                                <span>${shippingCharge}</span>
                            </div>
                            <div>
                                <p>GST:</p>
                                <span>${tax}</span>
                            </div>
                            <div className="orderSummaryTotal">
                                <div>
                                    <p>
                                        <b>Total:</b>
                                    </p>
                                    <span>${totalPrice}</span>
                                </div>
                                <button onClick={proceedToPayment} className='confirmbutton'>Proceed to payment</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConfirmOrder