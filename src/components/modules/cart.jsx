import React from "react";
import "../../assets/styles/components/modules/cart.scss"
import Button from "../atoms/Button"
import { useSelector, useDispatch } from "react-redux";
import { setCart } from "../../assets/scripts/store/redux-slices/modals";
import Article from "./article";

const Cart = ()=>{
    const dispatch = useDispatch();
    const cartIsOpen = useSelector((state) => state.modals.cart);
    const cart = useSelector((state) => state.cart)
    const isEmpty = cart.cart.length <= 0 ? true : false
    
    const pushToCommande = ()=>{
        console.log("push")
    }
    
    const close = ()=>{ 
        dispatch(setCart(false))
    }

    const formatNumber = () => {
        var zeroDec = /^.*^.\d{0}$/;
        var oneDec = /^.*\.\d{1}$/;

  
        const nb =  Math.round(cart.total * 100) / 100
  
        if(zeroDec.test(nb)){
          return nb + '.00'
        }else{
          if(oneDec.test(nb)){
            return nb + '0'
          }
        }
        return nb
  
      }

    if(cartIsOpen){
        return <div className="cart-wrapper">
            <aside className="cart">
                <div className="cart-header">
                    <h2>Pannier</h2>
                    <Button type="svg" content="cross" callBack={close}/>
                </div>
                    <hr/>
                <section className={`${isEmpty ? "isEmpty" : "" }`}>
                    {
                        isEmpty ? 
                        <h1>Votre pannier est vide</h1>: <ul>
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
                            <span>Total</span> <span>{cart.total ? formatNumber() + "€": " "}</span>
                        </div> : <></>
                    }
                    <Button type="text" callBack={isEmpty ? close : pushToCommande} content={isEmpty ? "Retourner à la boutique" : "Passer commande"} color="green"/>
                </div>
            </aside>
    </div>
    }else{
        return <></>
    }
}

export default Cart