import React from "react";
import "../../assets/styles/components/modules/cart.scss"
import Button from "../atoms/Button"
import { useSelector, useDispatch } from "react-redux";
import { setCart } from "../../assets/scripts/store/redux-slices/modals";
import Article from "./article";
import formatNumber from "../../assets/scripts/utils/priceNormalisation"

const Cart = ()=>{
    const dispatch = useDispatch();
    const cartIsOpen = useSelector((state) => state.modals.cart);
    const cart = useSelector((state) => state.cart)
    const isEmpty = cart.cart.length <= 0 ? true : false
    
    const pushToCommande = ()=>{
        window.location.href = `/recapitulatif-commande`
    }
    

    React.useEffect(()=>{
        const $body = document.querySelector("body")
        if(cartIsOpen){
            $body.style.overflow = 'hidden';
            $body.style.position = 'fixed';
            // $body.style.top = `-${scrollPosition}px`;
            $body.style.width = '100%';
        }else{
            $body.style.overflow = 'hidden auto';
            $body.style.removeProperty('position');
            $body.style.removeProperty('top');
            $body.style.removeProperty('width');
        }
    }, [cartIsOpen])

    const close = ()=>{ 
        dispatch(setCart(false))
    }

    if(cartIsOpen){
        return <div className="cart-wrapper">
            <aside className="cart">
                <div className="cart-header">
                    <h2>Panier</h2>
                    <Button type="svg" content="cross" callBack={close}/>
                </div>
                    <hr/>
                <section className={`${isEmpty ? "isEmpty" : "" }`}>
                    {
                        isEmpty ? 
                        <h1>Votre panier est vide</h1>: <ul>
                            {
                                cart.cart.map((article, index)=>{
                                    return <li key={index}><Article data={article} display="onCart"/></li>
                                })
                            }
                        </ul>
                    }
                </section>
                <div className="cart-footer">
                    <hr />
                    {
                        !isEmpty ?
                        <div className="total">
                            <span>Total</span> <span>{cart.total ? formatNumber(cart.total) + "€": " "}</span>
                        </div> : <></>
                    }
                    <Button type="text" callBack={isEmpty ? close : pushToCommande} content={isEmpty ? "Retourner à la boutique" : "Passer commande"} color="green"/>
                </div>
            </aside>
    </div>
    }else{
        console.log(cart.quantity)
        return <>{
                cart.quantity ?
                
                 <div className="count">
                    {cart.quantity}
                 </div> 
                 : <></>
                }</>
    }
}

export default Cart