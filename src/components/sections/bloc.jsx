import React from "react";

// SCSS
import "../../assets/styles/components/sections/bloc.scss"

// Store
import { useSelector, useDispatch } from "react-redux";
import { setDeliveryPrice } from "../../assets/scripts/store/redux-slices/cart.js"

// Modules 
import Facturation from "../modules/facturation";
import Information from "../modules/information";
import Article from "../modules/article";
import Select from "../modules/select";

// Scripts
import formatNumber from "../../assets/scripts/utils/priceNormalisation"



const Bloc = ({type, saveFacture,})=>{
    const cart = useSelector((state) => state.cart)
    const dispatch = useDispatch()



    React.useEffect(()=>{
        let totalWeight = 0;
        let deliveryPrices = 0;
        if(cart.deliveryMode !== "Sur Place"){
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

    },[cart.deliveryMode, cart.deliveryPrice, cart.payementMode])

    return (   
        <section className="Bloc">
            <div className="contenu">
                <p className="title">{type}</p>
                <hr/> 
                {
                    type==="Récapitulatif" && (
                        <div className="bloc0">
                        <div className="recap-commande">
                                {
              
                                    cart.cart.map((el)=>{
                                        return <div className="line">
                                        <p>{el.name}</p>
                                        <p>{el.quantity * el.price}€</p>
                                    </div>
                                    })  
                                }
              
                                <div className="line fdp">
                                    <p>Frais de ports</p>
                                    <p>{cart.deliveryPrice}€</p>
                                </div>
              
                                <div className="line">
                                    <p>Total TTC</p>
                                    <p>{formatNumber(cart.total + cart.deliveryPrice)}€</p>
                                </div>
                            </div>
                      </div>
                    )
                }
                {
                    type==="Facturation" && (<Facturation/>)
                }
                {
                    type==="Mode de payement" && (<Select type="payement" saveFacture={saveFacture}/>)
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
                            <p>Total TTC</p><p>{formatNumber(cart.total)}€</p>
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
        </section>
    )
}
export default Bloc