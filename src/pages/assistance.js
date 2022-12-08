import React from "react";
import { Link } from "react-router-dom";
import "../assets/styles/components/pages/conditions.scss"
import { useDispatch, useSelector } from "react-redux";
import { setManufacter, setCategory } from "../assets/scripts/store/redux-slices/filters";
const Assistance = ()=>{
    const dispatch = useDispatch()

    const sendTo = (e)=>{
        dispatch(setManufacter(""))
        dispatch(setCategory(e))
    }

    return <section className="assistance-wrapper">  
        <article>
            <h1>Un problème ? </h1>
        </article>
        <article>
            <h2>Mon poêle ne s'allume pas</h2>
            <p>Les granules ne descende pas, regardez <Link to="/" onClick={()=>sendTo("Motoréducteur ")}>les Motoréducteurs</Link></p>
            <p>Les granules tombent mais ne s'enflamme pas, regardez <Link to="/" onClick={()=>sendTo("Résistance")}>les Résistances</Link></p>
        </article>
        <article>
            <h2>Rien ne s'affiche sur l'écran</h2>
            <p>Vérifier prise, fusible puis</p>
            <p><Link to="/" onClick={()=>sendTo("Ecran | Afficheur | Display")}>Écran </Link></p>
            <p><Link to="/" onClick={()=>sendTo("Carte électronique")}> Carte Éléctronique </Link></p>
        </article>
        <article>
            <h2>Mon poêle fait du bruit: </h2>
            <p><Link to="/" onClick={()=>sendTo("Ventilateur")}> Ventilateur centrifuge</Link></p>
            <p><Link to="/" onClick={()=>sendTo("Ventilateur")}> Ventilateur tangentiel</Link></p>
            <p><Link to="/" onClick={()=>sendTo("Extracteur fumées")}>Extracteur</Link></p>
            <p> <Link to="/" onClick={()=>sendTo("Motoréducteur ")}>Motoréducteur</Link></p>
        </article>
    </section>
}

export default Assistance