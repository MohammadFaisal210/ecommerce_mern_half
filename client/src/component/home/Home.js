import React, { useEffect, useState } from 'react'
import { BsMouse } from "react-icons/bs"
import Product from '../product/Product'
import { useSelector, useDispatch } from "react-redux"
import { getProduct, clearErrors } from "../../redux/actions/productAction"
import { useParams, useHistory } from "react-router-dom"
import Loading from '../layout/loader/Loading'
import { useAlert } from "react-alert"
const Home = () => {
    const dispatch = useDispatch()
    const alert = useAlert()
    const { loading, products, result, error } = useSelector(state => state.products)

    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }
        dispatch(getProduct())
    }, [dispatch, error, alert])

    // console.log(params.id);

    return (
        <>

            {loading ? <Loading /> : (
                <>
                    <div className="home">
                        <div className="container banner">
                            <h3>Welcome to dream shop</h3>
                            <h2>Find amazing  products below</h2>

                            <a href="#product">
                                <button>
                                    Scroll <BsMouse />
                                </button>
                            </a>
                        </div>
                    </div>
                    <Product products={products} />
                </>
            )
            }
        </>
    )
}

export default Home