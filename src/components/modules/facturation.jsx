import React from "react";
import Input from "../atoms/input";
import "../../assets/styles/components/modules/facturation.scss"
const Facturation = () => {

    

    return (
        <>
            <div className="Facturation">
                <Input type="text" placeHolder="Nom *" className="nom"/>
                <Input type="text" placeHolder="Prenom *" className="prenom"/>
                <Input type="text" placeHolder="Entreprise" className="entreprise"/>
                <Input type="text" placeHolder="Numero *" className="numero"/>
                <Input type="text" placeHolder="Rue *" className="rue"/>
                <Input type="text" placeHolder="Ville *" className="ville"/>
                <Input type="text" placeHolder="Code Postal *" className="cp"/>
                <Input type="text" placeHolder="Complement" className="complement"/>
            </div>
        </>
    )
}
export default Facturation