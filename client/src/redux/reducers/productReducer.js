import ACTIONS from "../actions";
export const productsReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case ACTIONS.ALL_PRODUCT_REQUEST:
            return {
                loading: true,
                product: []

            }
        case ACTIONS.ALL_PRODUCT_SUCCESS:
            return {
                loading: false,
                products: action.payload.products,
                result: action.payload.result,
                prductsCount: action.payload.prductsCount,
                resultperpage: action.payload.resultperpage,
            }
        case ACTIONS.ALL_PRODUCT_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case ACTIONS.CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
}

export const productDetailsReducer = (state = { product: {} }, action) => {
    switch (action.type) {
        case ACTIONS.PRODUCT_DETAILS_REQUEST:
            return {
                loading: true,
                ...state
            }
        case ACTIONS.PRODUCT_DETAILS_SUCCESS:
            return {
                loading: false,
                product: action.payload
            }
        case ACTIONS.PRODUCT_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case ACTIONS.CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state
    }
}