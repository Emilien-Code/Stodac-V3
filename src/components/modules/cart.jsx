import React from "react";
import "../../assets/styles/components/modules/cart.scss"
import Button from "../atoms/Button"
import { useSelector, useDispatch } from "react-redux";
import { setCart } from "../../assets/scripts/store/redux-slices/modals";
import Article from "./article";
import formatNumber from "../../assets/scripts/utils/priceNormalisation"
import gsap from "gsap";
import { useNavigate } from "react-router-dom";


const Cart = ()=>{
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const cartIsOpen = useSelector((state) => state.modals.cart);
    const cart = useSelector((state) => state.cart)
    const isEmpty = cart.cart.length <= 0 ? true : false
    const cartRef = React.useRef(null)
    const pushToCommande = ()=>{
        navigate(`/recapitulatif-commande`)
    }
    

    React.useEffect(()=>{
        const $body = document.querySelector("body")
        if(cartIsOpen){
            $body.style.overflow = 'hidden';
            $body.style.position = 'fixed';
            $body.style.width = '100%';
        }else{
            $body.style.overflow = 'hidden auto';
            $body.style.removeProperty('position');
            $body.style.removeProperty('top');
            $body.style.removeProperty('width');
        }

        if(cartIsOpen){
            const tl = gsap.timeline({})

            if(!isEmpty){

                document.querySelector(".cartNotEmpty").style.overflow = "hidden"
                document.querySelector(".cartNotEmpty ul").style.overflow = "hidden"
            
            }


            tl.to('.cart-wrapper', {
                opacity: 1,
                duration: .1
            })
            tl.fromTo(
                cartRef.current,{
                x: '120%',
                y: -500,
                height: '200%',
                transformOrigin: "center",
                rotate: '-5deg'
            },{
                x:0,
                y:0,
                height: '100%',
                rotate: '0deg',
                duration: 0.5
            })
            tl.fromTo('hr', {opacity: 0}, { opacity : 1, duration : .2})
            tl.fromTo('.cart-header',{
                y: 100
            },{
                y: 0,
            })
            if(isEmpty){

            tl.fromTo(".h1-text", {
                y: 140,
                rotate: '12deg'
            },{
                y:0,
                rotate: '0deg',
                stagger: .1,
                duration: .4
            })
            }
            if(!isEmpty){

                tl.fromTo(".cartNotEmpty li", {
                    opacity: 0,
                    y: 50
                },{
                    y: 0,
                    opacity: 1,
                    stagger: .2,
                }).fromTo(".total",{ y:20, opacity : 0 },{ y: 0, opacity : 1, duration: .3 })
            
            }

            tl.fromTo(".cart-footer .button",{
                y: 20,
                opacity: 0
            },{
                y: 0,
                opacity: 1,
                duration: .3,
                onConclude: ()=>  {
                    if(!isEmpty)
                        document.querySelector(".cartNotEmpty").style.overflow = "auto"
                }
            })

        }

    }, [cartIsOpen])

    const close = ()=>{ 
        const tl = gsap.timeline({})

        tl.to(".cart-footer .button", {
            y: 20,
            opacity: 0,
            duration: .3,
        })
        if(!isEmpty) tl.to(".total",{ y:20, opacity : 0, duration: .3 })
        tl.to('hr', {opacity: 0, duration : .2})


        if(!isEmpty){

            tl.to(".cartNotEmpty li", {
                y: 50,
                opacity: 0,
                stagger: .2,
            })
  

        }else{

            tl.to(".h1-text", {
                y: -110,
                rotate: '12deg',
                stagger: .1,
                duration: .4
            })
            
        }

        tl.to('.cart-header',{
            y: 100,
        })
        tl.to(
            cartRef.current,{
            x: '120%',
            y: -500,
            height: '200%',
            transformOrigin: "center",
            rotate: '-5deg',
            duration: 0.5
        })
        tl.to('.cart-wrapper', {
            opacity: 0,
            duration: .1,
            onConclude: () => {
                 dispatch(setCart(false))
            }
        })

    }

    if(cartIsOpen){
        return <div className="cart-wrapper" >
            <aside className="cart" ref={cartRef}>
                <div className="cart-header-mask">
                    <div className="cart-header">
                        <h2>Panier</h2>
                        <Button type="svg" content="cross" callBack={close}/>
                    </div>
                </div>
                    <hr/>
                <section className={`${isEmpty ? "isEmpty" : "cartNotEmpty" }`}>
                    {
                        isEmpty ? 
                        <h1>
                            <div className="h1-mask"><span className="h1-text">Votre</span></div>
                            <div className="h1-mask"><span className="h1-text">panier</span></div>
                            <div className="h1-mask"><span className="h1-text">est vide</span></div>
                        </h1>: <ul>
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
                    <div className="btn-mask">
                    <Button type="text" callBack={isEmpty ? close : pushToCommande} content={isEmpty ? "Retourner à la boutique" : "Passer commande"} color="green"/>
                    </div>
                </div>
            </aside>
    </div>
    }else{
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