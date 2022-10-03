import React from "react";
import "../../assets/styles/components/modules/cart.scss"
import Button from "../atoms/Button"
import { useSelector, useDispatch } from "react-redux";
import { setCart } from "../../assets/scripts/store/redux-slices/modals";

const Cart = ()=>{
    const cartIsOpen = useSelector((state) => state.modals.cart);
    const dispatch = useDispatch();
    const isEmpty = true
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