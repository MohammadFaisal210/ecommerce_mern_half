import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addItemsToCart, removeCartItem } from "../../redux/actions/cartAction"
import { useHistory } from "react-router-dom";
import "./cart.css";
import Empty from "./Empty";

export default function Cart() {
    const dispatch = useDispatch()
    const history = useHistory()
    const { cartItems } = useSelector((state) => state.cart);

    const increseQuantity = (id, quantity, stock) => {
        const newQty = quantity + 1;
        if (stock <= quantity) return
        dispatch(addItemsToCart(id, newQty))
    }

    const decreseQuantity = (id, quantity) => {
        const newQty = quantity - 1;
        if (1 >= quantity) return
        dispatch(addItemsToCart(id, newQty))
    }

    const deleteCart = (id) => {
        if (!window.confirm("Are you sure ? remove the cart item.")) return
        dispatch(removeCartItem(id))
    }

    const checkoutHandler = () => {
        history.push("/login?redirect=shipping")
    }

    return (
        <>
            <div className="container">
                {
                    cartItems.length === 0 ? <Empty /> :
                        <>

                            <h1>Your cart</h1>
                            <div className="cartContainer">
                                <div className="cartleft">
                                    {cartItems &&
                                        cartItems.map((item) => (
                                            <div key={item.product} className="cartProducts">
                                                <div className="cartProdut">
                                                    <div className="cartImg">
                                                        <img src={item.image} alt="" />
                                                    </div>
                                                    <div className="cartProdutInfo">
                                                        <div>
                                                            <p>Product Name : </p>
                                                            <span>{item.name}</span>
                                                        </div>
                                                        <div>
                                                            <p>Price : </p>
                                                            <span className="cartPrice"> ${item.price}</span>
                                                        </div>
                                                        <div className="cartInput">
                                                            <button onClick={() => decreseQuantity(item.product, item.quantity)}>-</button>
                                                            <input type="number" value={item.quantity} readOnly />
                                                            <button onClick={() => increseQuantity(item.product, item.quantity, item.stock)}>+</button>
                                                        </div>

                                                        <div>
                                                            <p>total price : </p>
                                                            <span className="cartPrice">{`$ ${item.price * item.quantity
                                                                }`}</span>
                                                        </div>
                                                    </div>
                                                    <div onClick={() => deleteCart(item.product)} className="removeCart">
                                                        <i title="Delete" className="fa-solid fa-xmark"></i>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                </div>
                                <div className="rightCart">
                                    <div className="totalCart">
                                        <div>
                                            <h3>total price :</h3>
                                            <h4>{`$${cartItems.reduce(
                                                (acc, item) => acc + item.quantity * item.price,
                                                0
                                            )}`}</h4>
                                        </div>
                                        <div>
                                            <h3>total items :</h3>
                                            <h4>{cartItems.length} items</h4>
                                        </div>
                                        <div className="totalCartButton">
                                            <button onClick={checkoutHandler}>Check out</button>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </>
                }

            </div>
        </>
    );
}

