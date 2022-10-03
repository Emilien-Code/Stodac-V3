import React from "react";
import "../../assets/styles/components/modules/cart.scss"
import Button from "../atoms/Button"
import { useSelector, useDispatch } from "react-redux";
import { setCart } from "../../assets/scripts/store/redux-slices/modals";
import Article from "./article";

const Cart = ()=>{
    const cartIsOpen = useSelector((state) => state.modals.cart);
    const cart = useSelector((state) => state.cart.cart)
    const dispatch = useDispatch();
    const isEmpty = cart.length <= 0 ? true : false
    const close = ()=>{
        dispatch(setCart(false))
    }
    if(cartIsOpen){
        return <div className="cart-wrapper">
            <aside className="cart">
                <div className="cart-header">
                    <h2>Pannier</h2>
                    <Button type="svg" content="cross" callBack={close}/>
                </div>
                    <hr/>
                <section>
                    {
                        isEmpty ? 
                        <h1>Votre pannier est vide</h1>: <div>
                            <Article data={cart[0]} display="onCart"/>
                        </div>
                    }
                    <Button type="text" callBack={close} content="Retourner à la boutique" color="green"/>
                </section>

            </aside>
    </div>
    }else{
        return <></>
    }
}

export default Cart