import React from "react";
import "../assets/styles/components/pages/payement-commande.scss"
import Bloc from "../components/sections/bloc"
const Payement = ()=>{
    return <>
        <div className="bloc1">
            <Bloc type="Facturation"/>
        </div>
        <div className="Bloc2">
            <Bloc type="Mode de payement"/>
        </div>
    </>
}
export default Payement