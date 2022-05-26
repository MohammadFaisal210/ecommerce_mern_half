import React from 'react'
import { Link } from "react-router-dom"
function Empty() {
    return (
        <>
            <div className='emptycart'>
                <h2>Your cart is Empty</h2>
                <button>
                    <Link to="/products">Viw products</Link>
                </button>
            </div>
        </>
    )
}

export default Empty