import ACTIONS from "../actions";

export const userReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case ACTIONS.LOGIN_REQUEST:
        case ACTIONS.REGISTER_USER_REQUEST:
        case ACTIONS.LOAD_USER_REQUEST:
            return {
                loading: true,
                isAuthenticated: false
            }
        case ACTIONS.LOGIN_SUCCESS:
        case ACTIONS.REGISTER_USER_SUCCESS:
        case ACTIONS.LOAD_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload,
                accessToken: action.payload.accessToken
            }
        case ACTIONS.LOGOUT_USER_SUCCESS:
            return {
                loading: false,
                isAuthenticated: false,
                user: null
            }
        case ACTIONS.LOGIN_FAIL:
        case ACTIONS.REGISTER_USER_FAIL:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload
            }
        case ACTIONS.LOAD_USER_FAIL:
            return {
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload
            }
        case ACTIONS.LOGOUT_USER_FAIL:
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


export const profileReducer = (state = {}, action) => {
    switch (action.type) {
        case ACTIONS.UPDATE_PROFILE_REQUEST:
        case ACTIONS.UPDATE_PASSWORD_REQUEST:
            return {
                ...state,
                loading: true,
                profileLoad: false,
            };
        case ACTIONS.UPDATE_PROFILE_SUCCESS:
        case ACTIONS.UPDATE_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                profileLoad: true,
                isUpdated: action.payload,
            };
        case ACTIONS.UPDATE_PROFILE_FAIL:
        case ACTIONS.UPDATE_PASSWORD_FAIL:
            return {
                ...state,
                loading: false,
                profileLoad: false,
                error: action.payload,
            };

        case ACTIONS.UPDATE_PROFILE_RESET:
        case ACTIONS.UPDATE_PASSWORD_RESET:
            return {
                ...state,
                profileLoad: false,
                isUpdated: false,
            };
        case ACTIONS.CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };

        default:
            return state;
    }
};


export const forgotPassword = (state = {}, action) => {
    switch (action.type) {
        case ACTIONS.FORGOT_PASSWORD_REQUEST:
        case ACTIONS.RESET_PASSWORD_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
                message: false
            }
        case ACTIONS.FORGOT_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                message: true,
                data: action.payload,
            }
        case ACTIONS.RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: true,
                message: true,
                success: action.payload
            }
        case ACTIONS.RESET_PASSWORD_FAIL:
        case ACTIONS.FORGOT_PASSWORD_FAIL:
            return {
                ...state,
                loading: false,
                message: false,
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