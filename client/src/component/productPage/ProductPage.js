import React, { useEffect, useState } from 'react'
import ProductItem from "../product/productItem/ProductItem"
import { useSelector, useDispatch } from "react-redux"
import { clearErrors, getProduct } from "../../redux/actions/productAction"
import Loading from '../layout/loader/Loading'
import Search from '../search/Search'
import Slider from "@material-ui/core/Slider";
import Typography from '@material-ui/core/Typography'
import "./productPage.css"
import Pagination from "react-js-pagination"
import { useAlert } from "react-alert"
const categories = [
    "Laptop",
    "Man",
    "Boottom",
    "Fruits",
    "Animals"
]
function ProductPage() {

    const [search, setSearch] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const [price, setPrice] = useState([0, 1200])
    const [category, setCategory] = useState("")
    const [ratings, setRatings] = useState(0)

    const dispatch = useDispatch()
    const alert = useAlert()
    const { products, prductsCount, loading, result, resultperpage, error } = useSelector(state => state.products)

    const setCurrentPageNo = (e) => {
        setCurrentPage(e)
    }

    const priceHandler = (event, newPrice) => {
        setPrice(newPrice)
    }

    let count = result;
    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }
        dispatch(getProduct(search, currentPage, price, category, ratings))
    }, [dispatch, search, currentPage, price, category, ratings, error, alert])
    return (
        <div className='container'>
            <Search search={search} setSearch={setSearch} />
            <div className="filterBox">
                <Typography>Price :</Typography>
                <Slider
                    value={price}
                    onChange={priceHandler}
                    valueLabelDisplay="auto"
                    aria-labelledby='range-slider'
                    min={0}
                    max={1200}
                />
                <Typography>Categories :</Typography>
                <ul className="categoryBox">
                    {
                        categories.map((category) => (
                            <li key={category} onClick={() => setCategory(category)}>{category}</li>
                        ))
                    }
                </ul>
                <fieldset>
                    <Typography component="legend">Ratings Above</Typography>
                    <Slider
                        value={ratings}
                        onChange={(e, newRatings) => { setRatings(newRatings) }}
                        aria-labelledby="continous-slider"
                        valueLabelDisplay="auto"
                        min={0}
                        max={5}
                    />
                </fieldset>
            </div>
            {
                loading ? <Loading /> : (
                    <>
                        <div className="container">
                            <h1>Products</h1>
                            <div className="products ">
                                {
                                    products && products.map(product => (
                                        <ProductItem product={product} key={product._id} />
                                    ))
                                }
                            </div>
                            <div className="paginationBox">
                                {
                                    resultperpage <= count && (
                                        <Pagination
                                            activePage={currentPage}
                                            itemsCountPerPage={resultperpage}
                                            totalItemsCount={prductsCount}
                                            onChange={setCurrentPageNo}
                                            nextPageText="Next"
                                            prevPageText="Prev"
                                            firstPageText="First"
                                            lastPageText="Last"
                                            itemClass='page-item'
                                            activeClass='pageItemActive'
                                            activeLinkClass='pageLinkActive'
                                        />
                                    )
                                }

                            </div>
                        </div>
                    </>
                )
            }
        </div>
    )
}

export default ProductPage