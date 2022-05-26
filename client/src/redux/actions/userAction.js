import ACTIONS from ".";
import axios from "axios"

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: ACTIONS.LOGIN_REQUEST })
        const config = { headers: { "Content-Type": "application/json" } };
        const { data } = await axios.post("/user/login", {
            email, password, config
        }
        )

        dispatch({ type: ACTIONS.LOGIN_SUCCESS, payload: data.user })
    } catch (error) {
        dispatch({
            type: ACTIONS.LOGIN_FAIL,
            payload: error.response.data.msg
        })
    }
}



export const register = (name, email, password, avatar) => async (dispatch) => {
    try {
        dispatch({ type: ACTIONS.REGISTER_USER_REQUEST })

        const config = { headers: { "Content-Type": "multipart/form-data" } };

        const { data } = await axios.post("/user/register", {
            name, email, password, avatar, config
        }
        )
        dispatch({ type: ACTIONS.REGISTER_USER_SUCCESS, payload: data.newUser })
    } catch (error) {
        dispatch({
            type: ACTIONS.REGISTER_USER_FAIL,
            payload: error.response.data.msg
        })
    }
}

export const refreshtoken = () => async (dispatch) => {
    try {
        dispatch({ type: ACTIONS.GET_TOKEN_REQUEST })

        const { data } = await axios.post("/user/refresh_token")

        dispatch({ type: ACTIONS.GET_TOKEN_SUCCESS, payload: data })
    } catch (error) {
        dispatch({
            type: ACTIONS.GET_TOKEN_FAIL,
            payload: error.response.data.msg
        })
    }
}


export const loadUser = (token) => async (dispatch) => {
    try {
        dispatch({ type: ACTIONS.LOAD_USER_REQUEST })

        const { data } = await axios.get("/user/infor", {
            headers: { Authorization: token }
        })

        dispatch({ type: ACTIONS.LOAD_USER_SUCCESS, payload: data.user })
    } catch (error) {
        dispatch({
            type: ACTIONS.LOAD_USER_FAIL,
            payload: error.response.data.msg
        })
    }
}

export const logout = () => async (dispatch) => {
    try {
        await axios.post("user/logout")
        dispatch({ type: ACTIONS.LOGOUT_USER_SUCCESS })
    } catch (error) {
        dispatch({
            type: ACTIONS.LOGOUT_USER_FAIL,
            payload: error.response.data.msg
        })
    }
}

export const updateProfile = (name, avatar, token) => async (dispatch) => {
    try {
        dispatch({
            type: ACTIONS.UPDATE_PROFILE_REQUEST
        })

        const config = { headers: { "Content-Type": "multipart/form-data" } }

        const { data } = await axios.put("/user/updateInfor", { name, avatar, config }, { headers: { Authorization: token } })
        dispatch({
            type: ACTIONS.UPDATE_PROFILE_SUCCESS,
            payload: data.user
        })
    } catch (error) {
        dispatch({
            type: ACTIONS.UPDATE_PROFILE_FAIL,
            payload: error.response.data.msg
        })
    }
}


export const updatePassword = (oldpassword, newPassword, confirmPassword, token) => async (dispatch) => {
    try {
        dispatch({
            type: ACTIONS.UPDATE_PASSWORD_REQUEST
        })
        const config = { headers: { "Content-Type": "application/json" } };

        const { data } = await axios.patch("/user/updatePass", {
            oldpassword, newPassword, confirmPassword, config
        }, {
            headers: { Authorization: token }
        })
        dispatch({ type: ACTIONS.UPDATE_PASSWORD_SUCCESS, payload: data.msg })
    } catch (error) {
        dispatch({
            type: ACTIONS.UPDATE_PASSWORD_FAIL,
            payload: error.response.data.msg
        })
    }
}


export const forgotPass = (email) => async (dispatch) => {
    try {
        dispatch({ type: ACTIONS.FORGOT_PASSWORD_REQUEST })

        const { data } = await axios.post("/user/forgot", { email })

        dispatch({
            type: ACTIONS.FORGOT_PASSWORD_SUCCESS,
            payload: data.msg
        })
    } catch (error) {
        dispatch({
            type: ACTIONS.FORGOT_PASSWORD_FAIL,
            payload: error.response.data.msg
        })
    }
}

export const resetpassword = (password, token) => async (dispatch) => {
    try {
        dispatch({
            type: ACTIONS.RESET_PASSWORD_REQUEST
        })
        const { data } = await axios.put("/user/reset", { password }, { headers: { Authorization: token } })

        dispatch({
            type: ACTIONS.RESET_PASSWORD_SUCCESS,
            payload: data.msg
        })
    } catch (error) {
        dispatch({
            type: ACTIONS.RESET_PASSWORD_FAIL,
            payload: error.response.data.msg
        })
    }
}

export const clearErrors = () => async (dispatch) => {
    dispatch({ type: ACTIONS.CLEAR_ERRORS })
}