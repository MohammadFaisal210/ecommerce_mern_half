import React, { useEffect, useState } from 'react'
import { Link, useHistory, useLocation } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { clearErrors, login } from "../../redux/actions/userAction"
import { useAlert } from "react-alert"

function Login() {
    const [show, setShow] = useState(false)
    const [users, setUsers] = useState({
        email: "",
        password: ""
    })
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUsers({ ...users, [name]: value })
    }
    const { email, password } = users;
    const dispatch = useDispatch()
    const alert = useAlert()
    const history = useHistory()
    const location = useLocation()

    const { error, isAuthenticated } = useSelector(state => state.user)

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
        localStorage.setItem('firstLogin', true)
        if (isAuthenticated) {
            // history.push("/")
            alert.success("Login successfully")
        }
    }

    const passToggle = () => {
        setShow(!show)
    }

    const redirect = location.search ? location.search.split("=")[1] : "/account"

    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }
        if (isAuthenticated) {
            history.push(redirect)
        }
    }, [dispatch, error, alert, history, isAuthenticated, redirect])
    return (
        <>
            <div className="login container">
                <div className="login_page">
                    <h1>Login form</h1>
                    <form className='login_form' onSubmit={handleSubmit} >
                        <div>
                            <label htmlFor="email">Email</label>
                            <input type="email" placeholder='Enter your email' value={email} name="email" onChange={handleChange} />
                        </div>
                        <div>
                            <label htmlFor="password">Password</label>
                            {/* <div className="passToggle"> */}
                            <input type={show ? "text" : "password"} placeholder='Enter your password' value={password} onChange={handleChange} name="password" />
                            <span className='showButton' onClick={passToggle}>{show ? <i title="Hide" className="fa-solid fa-eye-slash"></i> : <i title="Show" className="fa-solid fa-eye"></i>}</span>
                            {/* </div> */}
                        </div>
                        <div className='login_button'>
                            <button type='submit'>Login</button>
                            <Link to="/forgot_password">Forgot passowrd</Link>
                        </div>
                        <Link to="/register"><span>new user ?</span> Register</Link>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login