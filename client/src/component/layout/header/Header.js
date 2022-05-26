import React, { useState } from 'react'
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { logout } from "../../../redux/actions/userAction"
import { useAlert } from "react-alert"


export default function Header() {
    const [menu, setMenu] = useState(false)

    const dispatch = useDispatch()
    const alert = useAlert()

    const { isAuthenticated, user } = useSelector(state => state.user)

    const { cartItems } = useSelector((state) => state.cart);

    const togglemenu = () => {
        setMenu(!menu)
    }
    const handleLog = () => {
        localStorage.removeItem('firstLogin', true)
        dispatch(logout())
        setMenu(!menu)
        alert.success("Logout successfully")
    }

    const logOut = () => {
        return (<>
            <li onClick={handleLog}><Link to="/">LogOut</Link></li>
            <li onClick={togglemenu} className='headerProfile'><Link to="/account"><img src={user.avatar.url} alt="profile" /></Link></li>
        </>
        )
    }

    const styleMenu = {
        left: menu ? 0 : "-100%"
    }

    return (
        <header>
            <div className="header">
                <div className='bars' onClick={togglemenu}>
                    {
                        menu ? <i className="fa-solid fa-xmark"></i> : <i className="bars fa-solid fa-bars"></i>
                    }

                </div>
                <div className='logo'>
                    <h1> <Link to="/">Faisal</Link></h1>
                </div>
                <div className='menu'>
                    <ul style={styleMenu}>
                        <li onClick={togglemenu}>
                            <Link to="/">Home</Link>
                        </li>
                        <li onClick={togglemenu}>
                            <Link to="/products">products </Link>
                        </li>
                        <li onClick={togglemenu}>
                            <Link to="/contact">contact</Link>
                        </li>
                        <li onClick={togglemenu}>
                            <Link to="/about">about</Link>
                        </li>
                        {
                            isAuthenticated ? logOut() :
                                <li onClick={togglemenu}>
                                    <Link to="/login">Login</Link>
                                </li>
                        }
                    </ul>
                </div>
                <div className='icons'>
                    <div className='cart'>
                        <Link to="/cart"><i title='Cart items' className="fa-solid fa-cart-plus"></i></Link>
                        <span>{cartItems.length}</span>
                    </div>
                </div>
            </div>
        </header>
    )
}
