import React from "react";
import "../../assets/styles/components/sections/bloc.scss"
// import Icon from "../atoms/Icon";
import Facturation from "../modules/facturation";
import { useSelector, useDispatch } from "react-redux";
import Information from "../modules/information";
import Article from "../modules/article";
import Select from "../modules/select";
const Bloc = ({type})=>{
    const cart = useSelector((state) => state.cart)


    // React.useEffect(({})=>{

    // },[])

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
                            <p>Total</p><p>{cart.total}€</p>
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
                            <p>Frais de ports</p><p>{cart.total}€</p>
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