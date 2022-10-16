import React from "react";
import {useState} from 'react';
import Paypal from "../atoms/paypal";
import Button from "../atoms/Button";
import "../../assets/styles/components/modules/payement.scss"
const Payement = () => {

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

    return (
        <>  
            <div className={nomdiv==="modePayement" ? "modePayement" : "invisible"}>
                <Button content="Paypal ou carte bleue" type="selecteur" callBack={selectionnerP}/>
                <Button content="Cheque" type="selecteur" callBack={selectionnerC}/>
                <Button content="Virement" type="selecteur" callBack={selectionnerV}/>
            </div>
            <div className={nomdiv==="modePaypal"? "modePaypal" : "invisible"}>
                <p>Paypal ou carte bleue</p>
                <Button content="modifier" type="text" callBack={retourChoix}/>
                <Paypal/>
            </div>
            <div className={nomdiv==="modeCheque" ? "modeCheque" : "invisible"}>
                <p>Cheque</p>
                <Button content="modifier" type="text" callBack={retourChoix}/>
                <p className="desc">la faut decrire ce qu'il faut faire pour le cheque</p>
            </div>
            <div className={nomdiv==="modeVirement" ? "modeVirement" : "invisible"}>
                <p>Virement</p>
                <Button content="modifier" type="text" callBack={retourChoix}/>
                <p className="desc">la faut decrire ce qu'il faut faire pour le virement</p>
            </div>
        </>
    )
}
export default Payement