import ACTIONS from ".";
import axios from "axios";


export const addItemsToCart = (id, quantity) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/product/${id}`);

    dispatch({
        type: ACTIONS.ADD_TO_CART,
        payload: {
            product: data.product._id,
            name: data.product.name,
            price: data.product.price,
            image: data.product.images[0].url,
            stock: data.product.Stock,
            quantity,
        },
    });

    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeCartItem = (id) => (dispatch, getState) => {
    dispatch({
        type: ACTIONS.REMOVE_CART_ITEM,
        payload: id
    })
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems))
}

export const saveShippingInfo = (data) => (dispatch) => {
    dispatch({
        type: ACTIONS.SAVE_SHIPPING_INFO,
        payload: data
    })
    localStorage.setItem("shippingInfo", JSON.stringify(data))
}