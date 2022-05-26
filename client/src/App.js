import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Header from "./component/layout/header/Header.js"
import Footer from './component/layout/footer/Footer.js'
import Pages from './component/Pages.js'
import { useSelector, useDispatch } from 'react-redux';
import { refreshtoken, loadUser } from "./redux/actions/userAction"
import { login } from "./redux/actions/userAction"
import UserOption from './component/layout/useOption/UserOption.js'
import axios from 'axios'

export default function App() {
  const dispatch = useDispatch()
  const { token } = useSelector(state => state.token)

  const { user, loading, isAuthenticated } = useSelector(state => state.user)

  const [stripeApiKey, setStripeApiKey] = useState("")

  const getStripeApiKey = async () => {
    const { data } = await axios.get("/api/payment", {
      headers: { Authorization: token }
    })
    setStripeApiKey(data.stripeApiKey)
  }

  useEffect(() => {
    const firstLogin = localStorage.getItem('firstLogin')
    if (firstLogin) {
      dispatch(refreshtoken())
    }
  }, [dispatch])

  useEffect(() => {
    if (token) {
      dispatch(login())
      dispatch(loadUser(token))
    }
    getStripeApiKey()
  }, [dispatch, token, getStripeApiKey])

  return (
    <div>
      <Router>
        <Header />
        <div className="App">
          {isAuthenticated && <UserOption user={user} />}
          <Pages stripeApiKey={stripeApiKey} />
        </div>
        <Footer />
      </Router>
    </div>
  )
}
