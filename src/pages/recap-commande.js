import React from "react";
import "../assets/styles/components/pages/payement-commande.scss"
import Bloc from "../components/sections/bloc"
import Button from "../components/atoms/Button";
import Input from "../components/atoms/input";

const Recap = ()=>{

    const push = ()=>{
        window.location.href = `/paiement-commande`
    }

    return <div className="payement-command">
        <div className="bloc1">
            <Bloc type="Panier"/>
        </div>
        <div className="Bloc2">
            <Bloc type="Mode de livraison"/>
        </div>
        <div className="confirm">
            <div className="conditions-vente">
                <Input type="checkbox"/> <p>J’accepte les conditions générales de vente</p>
            </div>
            <Button type="text" content="Commander" color="green" callBack={push}/>
        </div>
    </div>
}
export default Recap