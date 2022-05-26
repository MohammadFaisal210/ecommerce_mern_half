import ACTIONS from ".";
import axios from "axios";

export const createOrder = (order, token) => async (dispatch, getState) => {
    try {
        dispatch({ type: ACTIONS.CREATE_ORDER_REQUEST })
        const config = { headers: { "Content-Type": "application/json" } }

        const { data } = await axios.post("/api/order", order, config, {
            headers: { Authorization: token }
        })

        dispatch({
            type: ACTIONS.CREATE_ORDER_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ACTIONS.CREATE_ORDER_FAIL,
            payload: error.response.data.message,
        })
    }
}

export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: ACTIONS.CLEAR_ERRORS
    })
}