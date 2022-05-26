import { combineReducers } from "redux"

import { productsReducer, productDetailsReducer } from "./productReducer"
import { userReducer, profileReducer, forgotPassword } from "./userReducer"
import { tokenReducer } from "./tokenReducer"
import { cartReducer } from "./cartReducer"
import { newOrderReducer } from "./orderReducer"

export default combineReducers({
    products: productsReducer,
    details: productDetailsReducer,
    user: userReducer,
    token: tokenReducer,
    profile: profileReducer,
    forgotPassword: forgotPassword,
    cart: cartReducer,
    // order: newOrderReducer,
})