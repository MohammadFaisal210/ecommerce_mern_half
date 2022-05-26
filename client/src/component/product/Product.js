import React from 'react'
import ProductItem from './productItem/ProductItem'

export default function Product({ products }) {
    return (
        <>

            <div className="container" id="product">
                <h1>Feutered products</h1>
                <div className="products ">
                    {
                        products && products.map(product => (
                            <ProductItem product={product} key={product._id} />
                        ))
                    }
                </div>
            </div>
        </>
    )
}
