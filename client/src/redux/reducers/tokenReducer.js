import ACTIONS from "../actions";

export const tokenReducer = (state = { token: '' }, action) => {
    switch (action.type) {
        case ACTIONS.GET_TOKEN_REQUEST:
            return {
                loading: true,
                token: ''
            }
        case ACTIONS.GET_TOKEN_SUCCESS:
            return {
                ...state,
                loading: false,
                token: action.payload.accessToken
            }
        case ACTIONS.GET_TOKEN_FAIL:
            return {
                ...state,
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

