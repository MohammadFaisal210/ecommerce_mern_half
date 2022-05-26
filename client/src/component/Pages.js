import React from 'react'
import { Switch, Route } from "react-router-dom"
import axios from 'axios'
import Home from './home/Home'

import Details from './productDetails/Details'
import ProductPage from './productPage/ProductPage'

import Login from './auth/Login'
import Register from './auth/Register'

import ForgotPassword from './auth/ForgotPassword'
import ResetPassword from './auth/ResetPassword'

import Profile from './profile/Profile'
import EditProfile from './profile/editProfile/EditProfile'
import ChangePassword from "./profile/editProfile/ChangePassword"

import { useSelector } from "react-redux"
import PagenotFound from './utils/pagenotfound/PagenotFound'
import ProtectedRoute from './route/ProtectedRoute'

import Cart from './cart/Cart'
import ShippingInfo from './cart/ShippingInfo'
import ConfirmOrder from './cart/ConfirmOrder'
import Payment from './cart/Payment'
import OrderSuccess from './cart/OrderSuccess'

import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from '@stripe/stripe-js'

export default function Pages({ stripeApiKey }) {
    const { token } = useSelector(state => state.token)
    const { isAuthenticated } = useSelector(state => state.user)

    return (
        <>
            <Switch>
                <Route exact path="/" component={Home} />

                <Route exact path="/product/:id" component={Details} />
                <Route exact path="/products" component={ProductPage} />

                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />

                <Route exact path="/forgot_password" component={token ? PagenotFound : ForgotPassword} />
                <Route exact path="/user/reset/:token" component={token ? PagenotFound : ResetPassword} />

                <Route exact path="/account" component={isAuthenticated && Profile} />
                <Route exact path="/edit/profile" component={isAuthenticated && EditProfile} />
                <Route exact path="/updatePassword" component={isAuthenticated && ChangePassword} />

                <Route exact path="/cart" component={Cart} />
                <Route exact path="/shipping" component={isAuthenticated && ShippingInfo} />
                <Route exact path="/order/confirm" component={isAuthenticated && ConfirmOrder} />
                <Route exact path="/success" component={isAuthenticated && OrderSuccess} />

                {
                    stripeApiKey &&
                    <Elements stripe={loadStripe(stripeApiKey)}>
                        <Route exact path="/process/payment" component={isAuthenticated && Payment} />
                    </Elements>
                }


                {/* <Route path="*" exact component={PagenotFound} /> */}
            </Switch>
        </>
    )
}
