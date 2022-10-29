import React from "react";
import {useState} from 'react';
import Paypal from "../atoms/paypal";
import Button from "../atoms/Button";
import "../../assets/styles/components/modules/select.scss"
const Payement = ({type}) => {

    const [nomdiv, setNomdiv] = useState("modePayement");

    const retourChoix = () => {
        setNomdiv("modePayement")
    }


    const selectionnerP = () => {
        setNomdiv("modePaypal")
    }
    const selectionnerC = () => {
        setNomdiv("modeCheque")
    }
    const selectionnerV = () => {
        setNomdiv("modeVirement")
    }
    const selectionnerDomicile = () => {
        setNomdiv("modeDimicile")
    }
    const selectionnerPointRelais = () => {
        setNomdiv("modePointRelais")
    }
    const selectionnerSurPlace = () => {
        setNomdiv("modeSurPlace")
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
                <Paypal commandeInfo=""/>
            </div>
            <div className={nomdiv==="modeCheque" ? "visible" : "invisible"}>
                <p>Cheque</p>
                <p className="desc">La commande vous sera envoyée aussi tôt le chèque reçu. Ce dernier sera envoyé au 11 Bis Rue de Lorraine, 54360 Damelevières et sera à l'ordre d'AMC EST.</p>
            </div>
            <div className={nomdiv==="modeVirement" ? "visible" : "invisible"}>
                <p>Virement</p>
                <p className="desc">La commande vous sera envoyée aussitôt le virement effectué.<br/>IBAN : FR7614707090263112192565018 <br/>BIC : CCBPFRPPMTZ</p>
            </div>





            {/* LIVRAISON */}
            <div className={nomdiv==="modeDimicile"? "visible" : "invisible"}>
                <p>Livraison à domicile</p>

            </div>
            <div className={nomdiv==="modePointRelais" ? "visible" : "invisible"}>
                <p>Point relais</p>
                <p className="desc"></p>
            </div>
            <div className={nomdiv==="modeSurPlace" ? "visible" : "invisible"}>
                <p>Sur place</p>
                <p className="desc">Vous pouvez retirer votre commande dans nos locaux à Damelevières, 54360.</p>
            </div>
        </div>
    )
}
export default Payement