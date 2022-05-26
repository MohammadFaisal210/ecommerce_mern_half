const ACTIONS = {
    ALL_PRODUCT_REQUEST: "ALL_PRODUCT_REQUEST",
    ALL_PRODUCT_SUCCESS: "ALL_PRODUCT_SUCCESS",
    ALL_PRODUCT_FAIL: "ALL_PRODUCT_FAIL",
    CLEAR_ERRORS: "CLEAR_ERRORS",

    PRODUCT_DETAILS_REQUEST: "PRODUCT_DETAILS_REQUEST",
    PRODUCT_DETAILS_SUCCESS: "PRODUCT_DETAILS_SUCCESS",
    PRODUCT_DETAILS_FAIL: "PRODUCT_DETAILS_FAIL",

    //for User Login
    LOGIN_REQUEST: "LOGIN_REQUEST",
    LOGIN_SUCCESS: "LOGIN_SUCCESS",
    LOGIN_FAIL: "LOGIN_FAIL",

    //for User Register
    REGISTER_USER_REQUEST: "REGISTER_USER_REQUEST",
    REGISTER_USER_SUCCESS: "REGISTER_USER_SUCCESS",
    REGISTER_USER_FAIL: "REGISTER_USER_FAIL",

    // Refresh Token
    GET_TOKEN_REQUEST: "GET_TOKEN_REQUEST",
    GET_TOKEN_SUCCESS: "GET_TOKEN_SUCCESS",
    GET_TOKEN_FAIL: "GET_TOKEN_FAIL",

    // user infor
    LOAD_USER_REQUEST: "LOAD_USER_REQUEST",
    LOAD_USER_SUCCESS: "LOAD_USER_SUCCESS",
    LOAD_USER_FAIL: "LOAD_USER_FAIL",

    // Logout
    LOGOUT_USER_SUCCESS: "LOGOUT_USER_SUCCESS",
    LOGOUT_USER_FAIL: "LOGOUT_USER_FAIL",

    //Update Profile
    UPDATE_PROFILE_REQUEST: "UPDATE_PROFILE_REQUEST",
    UPDATE_PROFILE_SUCCESS: "UPDATE_PROFILE_SUCCESS",
    UPDATE_PROFILE_FAIL: "UPDATE_PROFILE_FAIL",
    UPDATE_PROFILE_RESET: "UPDATE_PROFILE_RESET",

    // Update Password
    UPDATE_PASSWORD_REQUEST: "UPDATE_PASSWORD_REQUEST",
    UPDATE_PASSWORD_SUCCESS: "UPDATE_PASSWORD_SUCCESS",
    UPDATE_PASSWORD_FAIL: "UPDATE_PASSWORD_FAIL",
    UPDATE_PASSWORD_RESET: "UPDATE_PASSWORD_RESET",

    // FORGOT PASSWORD
    FORGOT_PASSWORD_REQUEST: "FORGOT_PASSWORD_REQUEST",
    FORGOT_PASSWORD_SUCCESS: "FORGOT_PASSWORD_SUCCESS",
    FORGOT_PASSWORD_FAIL: "FORGOT_PASSWORD_FAIL",

    // Reset password
    RESET_PASSWORD_REQUEST: "RESET_PASSWORD_REQUEST",
    RESET_PASSWORD_SUCCESS: "RESET_PASSWORD_SUCCESS",
    RESET_PASSWORD_FAIL: "RESET_PASSWORD_FAIL",

    // Add to cart
    ADD_TO_CART: "ADD_TO_CART",

    // Remove cart item
    REMOVE_CART_ITEM: "REMOVE_CART_ITEM",

    // Shipping product
    SAVE_SHIPPING_INFO: "SAVE_SHIPPING_INFO",

    // Create order
    CREATE_ORDER_REQUEST: "CREATE_ORDER_REQUEST",
    CREATE_ORDER_SUCCESS: "CREATE_ORDER_SUCCESS",
    CREATE_ORDER_FAIL: "CREATE_ORDER_FAIL",
}
export default ACTIONS