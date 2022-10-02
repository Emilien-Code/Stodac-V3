import React from "react";
import "../assets/styles/components/pages/conditions.scss"
const assistance = ()=>{
    return <section className="assistance-wrapper">  
        <article>
            <h1>Un problème ? </h1>
        </article>
        <article>
            <h2>Mon poêle ne s'allume pas</h2>
            <p>Les granules ne descende pas, regardez les Motoréducteur</p>
            <p>Les granules tombent mais ne s'enflamme pas, regardez les Résistances</p>
        </article>
        <article>
            <h2>Rien ne s'affiche sur l'écran</h2>
            <p>Vérifier prise, fusible puis</p>
            <p>Écran</p>
            <p>Carte Éléctronique</p>
        </article>
        <article>
            <h2>Mon poêle fait du bruit: </h2>
            <p>Ventilateur centrifuge</p>
            <p>Ventilateur tangentiel</p>
            <p>Extracteur</p>
            <p>Motoréducteur</p>
        </article>
    </section>
}

export default assistance