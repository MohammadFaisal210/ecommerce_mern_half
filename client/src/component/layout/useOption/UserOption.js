import React, { useState } from 'react'
import "./userOption.css"
import { SpeedDial } from "@material-ui/lab"
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ListAltIcon from '@mui/icons-material/ListAlt';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { useHistory } from 'react-router-dom';
import { useAlert } from "react-alert"
import { logout } from "../../../redux/actions/userAction"
import { useDispatch, useSelector } from 'react-redux';
import "./userOption.css"
import { Backdrop } from '@material-ui/core';

export default function UserOption({ user }) {
    const [open, setOpen] = useState(false)
    const history = useHistory()
    const alert = useAlert()
    const dispatch = useDispatch()

    const { loading } = useSelector(state => state.user)
    const { cartItems } = useSelector(state => state.cart)
    const options = [
        { icon: <ListAltIcon />, name: "Orders", func: orders },
        { icon: <PersonIcon />, name: "Profile", func: account },
        {
            icon: (<i title='Cart items' style={{ color: cartItems.length > 0 ? "tomato" : "unsent" }} className="fa-solid fa-cart-plus"></i>),
            name: `Cart(${cartItems.length})`, func: cart
        },
        { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser }
    ]
    if (user.role === "admin") {
        options.unshift({
            icon: <DashboardIcon />,
            name: "Dashboard",
            func: dashboard
        })
    }
    function dashboard() {
        history.push("/dashboard")
    }
    function orders() {
        history.push("/orders")
    }
    function account() {
        history.push("/account")
    }
    function cart() {
        history.push("/cart")
    }
    function logoutUser() {
        dispatch(logout())
        localStorage.removeItem("firstLogin", true)
        alert.success("Logout Successfully")
    }
    return (
        <>
            {
                loading ? "Loading" :
                    <>
                        <Backdrop open={open ? true : false} style={{ zIndex: "10" }} />
                        <SpeedDial
                            ariaLabel='SpeedDial tooltip example'
                            onClose={() => setOpen(false)}
                            onOpen={() => setOpen(true)}
                            open={open}
                            direction="down"
                            className='speedDial'
                            icon={
                                <img className='speedDialIcon' src={user.avatar.url ? user.avatar.url : "/blank-profile.png"} alt="Profile" />
                            }
                        >

                            {
                                options.map((item) => (

                                    <SpeedDialAction key={Math.random()} icon={item.icon} tooltipTitle={item.name} onClick={item.func}

                                        tooltipOpen={window.innerWidth <= 600 ? true : false}
                                    />
                                ))
                            }
                        </SpeedDial>
                    </>
            }

        </>
    )
}
