import React from 'react'
import { Link } from "react-router-dom"
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import "./orderSuccess.css";

function OrderSuccess() {
    return (
        <>
            <div className="order_success">
                <div className="container">
                    <div className='success_box'>
                        <CheckCircleIcon />
                        <h2>Your Order has been Placed successfully</h2>
                        <Link to="/order/details">View Order</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default OrderSuccess