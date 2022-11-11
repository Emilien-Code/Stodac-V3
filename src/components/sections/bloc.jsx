import React from "react";
import "../../assets/styles/components/sections/bloc.scss"
// import Icon from "../atoms/Icon";
import Facturation from "../modules/facturation";
import { useSelector, useDispatch } from "react-redux";
import Information from "../modules/information";
import Article from "../modules/article";
import Select from "../modules/select";
import formatNumber from "../../assets/scripts/utils/priceNormalisation"
import { setDeliveryPrice } from "../../assets/scripts/store/redux-slices/cart.js"

const Bloc = ({type})=>{
    let cart = useSelector((state) => state.cart)
    const dispatch = useDispatch()



    React.useEffect(()=>{
        console.log('cart', cart.cart)
        let totalWeight = 0;
        let deliveryPrices = 0;
        if(cart.deliveryMode != "Sur Place"){
            console.log("DLMODE", cart)
            cart.cart.forEach(product=>{
                totalWeight += product.poids * product.quantity
            })

            if (totalWeight < 100 ) deliveryPrices = 8
            if (totalWeight >= 100 && totalWeight < 500) deliveryPrices = 10
            if (totalWeight >= 500 && totalWeight < 1000) deliveryPrices = 12
            if (totalWeight >= 1000 && totalWeight < 1500) deliveryPrices = 14
            if (totalWeight >= 1500 && totalWeight < 2000) deliveryPrices = 16
            if (totalWeight >= 2000 && totalWeight < 2500 ) deliveryPrices = 18
            if (totalWeight >= 2500 && totalWeight < 3000) deliveryPrices = 20
            if (totalWeight >= 3000 && totalWeight < 3500) deliveryPrices = 22
            if (totalWeight >= 3500 ) deliveryPrices = 24

            dispatch(setDeliveryPrice(formatNumber(deliveryPrices * 1.2 * 100)/100))
          }else{
            dispatch(setDeliveryPrice(0))
          }


        console.log("ttlW", totalWeight)
    },[cart.deliveryMode, cart.deliveryPrice, cart.payementMode])

    return (   
        <section className="Bloc">
            <div className="contenu">
                <p className="title">{type}</p>
                <hr/> 
                {
                    type==="Facturation" && (<Facturation/>)
                }
                {
                    type==="Mode de payement" && (<Select type="payement"/>)
                }
                {
                    type === "Panier" && (
                        <>
                        {
                            cart.cart.map((article, index)=>{
                                return <li key={index}><Article data={article} display="onCart"/></li>
                            })
                        }
                        <div className="bottom">
                            <p>Total</p><p>{formatNumber(cart.total)}€</p>
                        </div>
                        </>
                    )
                }
                {
                    type === "Mode de livraison" && (
                        <>
                        {
                            <Select type="delivery"/>
                        }
                        <hr />
                        <div className="bottom">
                            <p>Frais de ports</p><p>{cart.deliveryMode ? cart.deliveryPrice + "€" : ""}</p>
                        </div>
                        </>
                    )
                }









                {
                    (type==="Facturation" || type==="Mode de payement") && ( <hr/> )
                }



                
            </div>
            {
                type==="Facturation" && (<Information message="Les champs * sont obligatoires" />)
            }
            {
                type==="Mode de payement" && (<Information message="Paiement sécurisé par paypal" />)
            }
            {
                type==="Panier" && (<Information message="La totalitée des prix indiqués sur le site sont toute taxes comprises (ttc)" />)
            }
            {
                type==="Mode de livraison" && (<Information message="Nous ne prenons aucunes marge sur les frais de livraison. " />)
            }
        </section>
    )
}
export default Bloc