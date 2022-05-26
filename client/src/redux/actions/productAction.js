import axios from "axios"
import ACTIONS from "./index"
export const getProduct = (search = "", currentPage = 1, price = [0, 1200], category, ratings = 0) => async (dispatch) => {
    try {

        dispatch({ type: ACTIONS.ALL_PRODUCT_REQUEST })

        let link = `/api/product?name[regex]=${search}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`

        if (category) {
            link = `/api/product?name[regex]=${search}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`
        }

        const { data } = await axios.get(link)

        dispatch({
            type: ACTIONS.ALL_PRODUCT_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ACTIONS.ALL_PRODUCT_FAIL,
            payload: error.response.data.msg
        })
    }
}


export const getProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: ACTIONS.PRODUCT_DETAILS_REQUEST })

        const { data } = await axios.get(`/api/product/${id}`);

        dispatch({
            type: ACTIONS.PRODUCT_DETAILS_SUCCESS,
            payload: data.product
        })
    } catch (error) {
        dispatch({
            type: ACTIONS.PRODUCT_DETAILS_FAIL,
            payload: error.response.data.msg
        })
    }
}


export const clearErrors = () => async (dispatch) => {
    dispatch({ type: ACTIONS.CLEAR_ERRORS })
}
