import React, { useEffect, useState } from 'react'
import "./details.css";
import { useDispatch, useSelector } from "react-redux"
import { clearErrors, getProductDetails } from "../../redux/actions/productAction"
import Carousel from "react-material-ui-carousel"
import ReactStars from "react-rating-stars-component"
import { useParams } from "react-router-dom"
import Loading from '../layout/loader/Loading';
import ReviewCart from './ReviewCart';
import { useAlert } from "react-alert"
import ProductItem from '../product/productItem/ProductItem';
import { addItemsToCart } from "../../redux/actions/cartAction"
function Details() {
    const dispatch = useDispatch()
    const params = useParams()
    const alert = useAlert()
    const { product, loading, error } = useSelector(state => state.details)
    const { products } = useSelector(state => state.products)

    const options = {
        edit: false,
        color: "rgba(20,20,20,0.1)",
        activeColor: "tomato",
        size: window.innerWidth < 600 ? 20 : 25,
        value: product.ratings,
        isHalf: true
    }

    const [quantity, setQuantity] = useState(1)

    const increment = () => {
        if (product.Stock <= quantity) return
        setQuantity(quantity + 1)
    }

    const decrement = () => {
        if (1 >= quantity) return
        setQuantity(quantity - 1)
    }

    const addToCartHandler = () => {
        dispatch(addItemsToCart(params.id, quantity))
        alert.success("Item added to cart")
    }

    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }
        dispatch(getProductDetails(params.id))
    }, [dispatch, params.id, error, alert])
    return (
        <React.Fragment>
            {
                loading ? (<Loading />) : (
                    <>

                        <div className="container">
                            <h1>product details</h1>
                            <div className="ProductDetails">
                                <div>
                                    <Carousel>
                                        {
                                            product.images &&
                                            product.images.map((item, i) => (
                                                <img src={item.url} key={item._id} alt="" />
                                            ))
                                        }
                                    </Carousel>
                                </div>
                                <div className='detailsInfor'>
                                    <div className="details_bloack_1">
                                        <h2>{product.name}</h2>
                                        <p>Product # {product._id}</p>
                                    </div>
                                    <div className="details_bloack_2">
                                        <ReactStars {...options} />
                                        <span>
                                            ({product.numofReviews} Reviews)
                                        </span>
                                    </div>
                                    <div className="details_bloack_3">
                                        <h2>{`$${product.price}`}</h2>
                                        <div>
                                            <div className="">
                                                <button onClick={decrement}>-</button>
                                                <input type="number" value={quantity} readOnly />
                                                <button onClick={increment}>+</button>
                                            </div>
                                            <button onClick={addToCartHandler} className='addCart'>Add to Cart</button>
                                        </div>
                                        <p>
                                            Status:
                                            <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                                                {product.Stock < 1 ? "OutOfStock" : "InStock"}
                                            </b>
                                        </p>
                                    </div>
                                    <div className="details_bloack_4">
                                        Description : <p>{product.description}</p>
                                    </div>
                                    <div className="">
                                        <button className="submitReview">Submit Review</button>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className='reviewCart'>
                            <h3 className="reviesTitle">Reviews</h3>
                            {
                                product.reviews && product.reviews[0] ? (
                                    <div className="reviews">
                                        {
                                            product.reviews && product.reviews.map((review) => (
                                                <ReviewCart key={review._id} review={review} />
                                            ))
                                        }
                                    </div>
                                ) : (
                                    <p>No reviews yet</p>
                                )
                            }
                        </div>
                        <div className="container">
                            <h1>Related products</h1>
                            <div className="products">
                                {
                                    products && products.map(product => {
                                        return product.category === product.category ?
                                            <ProductItem product={product} key={product._id} /> : null
                                    })
                                }
                            </div>
                        </div>
                    </>
                )
            }
        </React.Fragment>
    )
}

export default Details