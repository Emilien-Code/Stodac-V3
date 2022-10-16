import React from "react";
import "../../assets/styles/components/sections/bloc.scss"
// import Icon from "../atoms/Icon";
import Facturation from "../modules/facturation";
import Information from "../modules/information";
import Payement from "../modules/payement";
const Bloc = ({type})=>{


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
                    type==="Mode de payement" && (<Payement/>)
                }
                <hr/>
            </div>
            {
                type==="Facturation" && (<Information message="Les champs * sont obligatoires" />)
            }
            {
                type==="Mode de payement" && (<Information message="Paiement sécurisé par paypal" />)
            }
            {/* <Information message="La totalitée des prix indiqués sur le site sont toute taxes comprises (ttc)"/> */}
        </section>
    )
}
export default Bloc