import React, { useEffect, useRef } from 'react'
import "./payment.css"
import { useSelector, useDispatch } from "react-redux"
import { Typography } from '@material-ui/core';
import { useAlert } from 'react-alert';
import { CardNumberElement, CardCvcElement, CardExpiryElement, useStripe, useElements } from "@stripe/react-stripe-js"
import axios from 'axios';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import EventIcon from '@mui/icons-material/Event';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import CheckoutSteps from './CheckoutSteps';
import { clearErrors } from "../../redux/actions/orderAction"
import { createOrder } from "../../redux/actions/orderAction"

function Payment({ history }) {
    const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"))

    const alert = useAlert();
    const dispatch = useDispatch();
    const stripe = useStripe();
    const elements = useElements();
    const payBtn = useRef(null)

    const { shippingInfo, cartItems } = useSelector(state => state.cart)
    const { user } = useSelector(state => state.user)
    const { error } = useSelector(state => state.order)
    const { token } = useSelector(state => state.token)

    const paymentData = {
        amount: Math.round(orderInfo.totalPrice * 100),
    }

    const order = {
        shippingInfor: shippingInfo,
        orderItems: cartItems,
        itemPrice: orderInfo.subtotal,
        taxPrice: orderInfo.tax,
        shippingPrice: orderInfo.shippingCharge,
        totalPrice: orderInfo.totalPrice
    }

    const submitHandler = async (e) => {
        e.preventDefault();

        payBtn.current.disabled = true;

        try {
            const config = {
                Headers: { "Content-Type": "application/json" }
            }
            const { data } = await axios.post("/api/payment", paymentData, config)

            const client_secret = data.client_secret;
            if (!stripe || !elements) return;

            const result = await stripe.confirmCardPayment(client_secret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    billing_details: {
                        name: user.name,
                        email: user.email,
                        phone: shippingInfo.phoneNo,
                        address: {
                            line1: shippingInfo.address,
                            city: shippingInfo.city,
                            state: shippingInfo.state,
                            postal_code: shippingInfo.pinCode,
                            country: shippingInfo.country,
                        }
                    }
                }
            })
            if (result.error) {
                payBtn.current.disabled = false;
                alert.error(result.error.message)
            } else {
                if (result.paymentIntent.status === "succeeded") {

                    order.paymentInfor = {
                        id: result.paymentIntent.id,
                        status: result.paymentIntent.status
                    };
                    dispatch(createOrder(order, token))
                    history.push("/success")
                } else {
                    alert.error("There's some issue while processing payment")
                }
            }
        } catch (error) {
            payBtn.current.disabled = false
            alert.error(error.response.data.message)
        }
    }

    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }
    }, [error, alert, dispatch])
    return (
        <>
            <div className="payment_page">
                <div className="container">
                    <CheckoutSteps activeStep={2} />
                    <form onSubmit={submitHandler} className="payment_form">
                        <Typography>Card Information</Typography>
                        <div>
                            <CreditCardIcon />
                            <CardNumberElement className='paymentInput' />
                        </div>
                        <div>
                            <EventIcon />
                            <CardExpiryElement className='paymentInput' />
                        </div>
                        <div>
                            <VpnKeyIcon />
                            <CardCvcElement className='paymentInput' />
                        </div>
                        <div>
                            <button type='submit' ref={payBtn} className='paymentFormBtn'>{`Pay -  $ ${orderInfo && orderInfo.totalPrice}`}</button>
                            {/* <input type="submit" value={`Pay - ${orderInfo && orderInfo.totalPrice}`} ref={payBtn} className="paymentFormBtn" /> */}
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Payment