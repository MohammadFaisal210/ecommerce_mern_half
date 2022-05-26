import ACTIONS from "../actions";

export const newOrderReducer = (state = {}, action) => {
    switch (action.type) {
        case ACTIONS.CREATE_ORDER_REQUEST:
            return {
                ...state,
                loading: true
            }
        case ACTIONS.CREATE_ORDER_SUCCESS:
            return {
                loading: false,
                order: action.payload,
            }
        case ACTIONS.CREATE_ORDER_FAIL:
            return {
                loading: true,
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