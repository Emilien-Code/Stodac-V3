import React from "react";
import Input from "../atoms/input";
import "../../assets/styles/components/modules/facturation.scss"


// Store
import { useSelector, useDispatch } from "react-redux";
import { setCommandeInfo } from "../../assets/scripts/store/redux-slices/cart.js"
const Facturation = () => {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart)

    
    const getLastName = (el) => {
        const infoCommande = JSON.parse(JSON.stringify(cart.commandInfo));
        infoCommande.facturation.lastName = el
        dispatch(setCommandeInfo(infoCommande))
    }
    const getFirstName = (el) => {
        const infoCommande = JSON.parse(JSON.stringify(cart.commandInfo));
        infoCommande.facturation.firstName = el
        dispatch(setCommandeInfo(infoCommande))
    }
    const getCorporation = (el) => {
        const infoCommande = JSON.parse(JSON.stringify(cart.commandInfo));
        infoCommande.facturation.corporation = el
        dispatch(setCommandeInfo(infoCommande))
    }
    const getNumber = (el) => {
        const infoCommande = JSON.parse(JSON.stringify(cart.commandInfo));
        infoCommande.facturation.streetNumber = el
        dispatch(setCommandeInfo(infoCommande))
    }
    const getStreet = (el) => {
        const infoCommande = JSON.parse(JSON.stringify(cart.commandInfo));
        infoCommande.facturation.street = el
        dispatch(setCommandeInfo(infoCommande))
    }
    const getCity = (el) => {
        const infoCommande = JSON.parse(JSON.stringify(cart.commandInfo));
        infoCommande.facturation.city = el
        dispatch(setCommandeInfo(infoCommande))
    }
    const getPostCode = (el) => {
        const infoCommande = JSON.parse(JSON.stringify(cart.commandInfo));
        infoCommande.facturation.postCode = el
        dispatch(setCommandeInfo(infoCommande))
    }
    const getComplement = (el) => {
        const infoCommande = JSON.parse(JSON.stringify(cart.commandInfo));
        infoCommande.facturation.complement = el
        dispatch(setCommandeInfo(infoCommande))
    }
    

    return (
        <>
            <div className="Facturation">
                <Input type="text" placeHolder="Nom *" className="nom" callBack={getLastName}/>
                <Input type="text" placeHolder="Prénom *" className="prenom" callBack={getFirstName}/>
                <Input type="text" placeHolder="Entreprise" className="entreprise" callBack={getCorporation}/>
                <Input type="text" placeHolder="Numéro *" className="numero" callBack={getNumber}/>
                <Input type="text" placeHolder="Rue *" className="rue" callBack={getStreet}/>
                <Input type="text" placeHolder="Ville *" className="ville" callBack={getCity}/>
                <Input type="text" placeHolder="Code Postal *" className="cp" callBack={getPostCode}/>
                <Input type="text" placeHolder="Complément" className="complement" callBack={getComplement}/>
            </div>
        </>
    )
}
export default Facturation
