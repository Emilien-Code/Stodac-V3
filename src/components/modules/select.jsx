import React from "react";
import {useState} from 'react';
import { setCommandeInfo } from "../../assets/scripts/store/redux-slices/cart.js";
// Store
import { useSelector, useDispatch } from "react-redux";
import cart, { setDeliveryMode, setPayementMode } from "../../assets/scripts/store/redux-slices/cart.js"

// Module
import Paypal from "../atoms/paypal";
import Button from "../atoms/Button";
import PntRelais from "./formulars/PntRelais"
import Input from "../atoms/input";

// SCSS
import "../../assets/styles/components/modules/select.scss"


const Payement = ({type, saveFacture}) => {
    const cart = useSelector((state) => state.cart)

    const dispatch = useDispatch();
    const [nomdiv, setNomdiv] = useState("modePayement");

    const payeWithoutPaypal = () => {
        saveFacture(-1)
    }
    const retourChoix = () => {
        setNomdiv("modePayement")
    }
    const selectionnerP = () => {
        setNomdiv("modePaypal")
        dispatch(setPayementMode("paypal"))
    }
    const selectionnerC = () => {
        setNomdiv("modeCheque")
        dispatch(setPayementMode("cheque"))
    }
    const selectionnerV = () => {
        setNomdiv("modeVirement")
        dispatch(setPayementMode("virement"))
    }
    const selectionnerDomicile = () => {
        setNomdiv("modeDimicile")
        dispatch(setDeliveryMode("Domicile"))
    }
    const selectionnerPointRelais = () => {
        setNomdiv("modePointRelais")
        dispatch(setDeliveryMode("Point Relais"))
    }
    const selectionnerSurPlace = () => {
        setNomdiv("modeSurPlace")
        dispatch(setDeliveryMode("Sur Place"))
    }
    const getNumber = (number)=>{
        const infoCommande = JSON.parse(JSON.stringify(cart.commandInfo));
        infoCommande.deliveryInfo.streetNumber = number
        dispatch(setCommandeInfo(infoCommande))
    }
    const getStreet = (street)=>{
        const infoCommande = JSON.parse(JSON.stringify(cart.commandInfo));
        infoCommande.deliveryInfo.street = street
        dispatch(setCommandeInfo(infoCommande))
    }
    const getCity = (city)=>{
        const infoCommande = JSON.parse(JSON.stringify(cart.commandInfo));
        infoCommande.deliveryInfo.city = city
        dispatch(setCommandeInfo(infoCommande))
    }
    const getCP = (postCode)=>{
        const infoCommande = JSON.parse(JSON.stringify(cart.commandInfo));
        infoCommande.deliveryInfo.postCode = postCode
        dispatch(setCommandeInfo(infoCommande))
    }
    const getComplement = (complement)=>{
        const infoCommande = JSON.parse(JSON.stringify(cart.commandInfo));
        infoCommande.deliveryInfo.complement = complement
        dispatch(setCommandeInfo(infoCommande))
    }


    return (
        <div className="select">  
            {
                nomdiv!=='modePayement'    && (<span className="modifier"  onClick={retourChoix}>modifier</span>)
            }   

            {
                type==="payement" && (
                    <div className={nomdiv==="modePayement" ? "modePayement" : "invisible"}>
                        <Button content="Paypal ou carte bleue" type="selecteur" callBack={selectionnerP}/>
                        <Button content="Cheque" type="selecteur" callBack={selectionnerC}/>
                        <Button content="Virement" type="selecteur" callBack={selectionnerV}/>
                    </div>
                )
            }
            {
                type==="delivery" && (
                    <div className={nomdiv==="modePayement" ? "modePayement" : "invisible"}>
                        <Button content="Livraison à domicile" type="selecteur" callBack={selectionnerDomicile}/>
                        <Button content="Livraison point relais" type="selecteur" callBack={selectionnerPointRelais}/>
                        <Button content="Retrait sur place" type="selecteur" callBack={selectionnerSurPlace}/>
                    </div>
                )
            }
            <div className={nomdiv==="modePaypal"? "visible" : "invisible"}>
                <p>Paypal ou carte bleue</p>
                <Paypal saveFacture={saveFacture} commandeInfo=""/>
            </div>


            <div className={nomdiv==="modeCheque" ? "visible" : "invisible"}>
                <p>Cheque</p>

                <p className="desc">La commande vous sera envoyée aussi tôt le chèque reçu. Ce dernier sera envoyé au 11 Bis Rue de Lorraine, 54360 Damelevières et sera à l'ordre d'AMC EST.</p>
                

                <Button content="Passer la commande" type="text" color="green" callBack={payeWithoutPaypal}/>
            </div>


            <div className={nomdiv==="modeVirement" ? "visible" : "invisible"}>
                <p>Virement</p>

                <p className="desc">La commande vous sera envoyée aussitôt le virement effectué.<br/>IBAN : FR7614707090263112192565018 <br/>BIC : CCBPFRPPMTZ</p>
                

                <Button content="Passer la commande" type="text" color="green" callBack={payeWithoutPaypal}/>
            </div>





            {/* LIVRAISON */}
            <div className={nomdiv==="modeDimicile"? "visible" : "invisible"}>
                <p>Livraison à domicile</p>
                <div className="delivery-adress">
                    <Input placeHolder="Numéro" type="text" callBack={getNumber} className="num"/>
                    <Input placeHolder="Rue" type="text" callBack={getStreet} className="rue"/>
                    <Input placeHolder="Ville" type="text" callBack={getCity} className="ville"/>
                    <Input placeHolder="Code Postal" type="text" callBack={getCP} className="cp"/>
                    <Input placeHolder="Complément" type="text" callBack={getComplement} className="complement"/>
                </div>
            </div>
            <div className={nomdiv==="modePointRelais" ? "visible" : "invisible"}>
                <p>Point relais</p>
                <div className="pnt-relais-container">
                    <PntRelais/>
                </div>

            </div>
            <div className={nomdiv==="modeSurPlace" ? "visible" : "invisible"}>
                <p>Sur place</p>
                <p className="desc">Vous pouvez retirer votre commande dans nos locaux à Damelevières, 54360.</p>
                <p className="desc">Un mail communiquant l'adresse vous sera envoyé.</p>
            </div>
        </div>
    )
}
export default Payement