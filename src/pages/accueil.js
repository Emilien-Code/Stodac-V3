import React from "react";

import Frieze from "../components/sections/ScrollingFrieze"
import Hero from "../components/sections/hero"
import TitleAndParagraph from "../components/sections/TitleAndParagraph"
import ParagraphAndImg from "../components/sections/paragraphAndImg"
import { Helmet } from "react-helmet";
import gsap from "gsap";

import "../assets/styles/components/pages/accueil.scss"

const isVisible = (element) => {
    const object = element.getBoundingClientRect();
    return object.top < window.innerHeight && object.bottom > 0;
}

const Accueil = ()=>{
    let scv = [0, 0, 0, 0, 0]
    let scrollValue = 1
    let lastScroll = 0
    let currentScroll = 0
    const translate = ()=>{
        const paralaxes = document.querySelectorAll(`[data-isparallax="true"]`)

        currentScroll = window.scrollY;


        paralaxes.forEach((p,index) => {
            if(isVisible(p)){

                if(lastScroll > currentScroll && currentScroll ){
                    scv[index] = scv[index] + 1
                }else{
                    scv[index] = scv[index] - 2
                }
                
                
                gsap.to(p, {
                    x: p.dataset.axe=="horizontal" ?  p.dataset.translateSpeed ? p.dataset.translateSpeed * scv[index] : 0 : 0,
                    y: p.dataset.axe=="vertical" ?  p.dataset.translateSpeed ? p.dataset.translateSpeed * scv[index] : 0 : 0,
                    rotate: p.dataset.rotateSpeed ? p.dataset.rotateSpeed * scv[index] : 0,
                })
                
            }
        })

        lastScroll = currentScroll
    }

    React.useEffect(()=>{

        window.addEventListener('scroll', translate)

        return () => window.removeEventListener("scroll", translate)


    },[])
    return(
        <>
            <Helmet>
                <title>
                    Accueil | Stodac : Vente d'accessoires pour poêles à granulés 
                </title>
                <meta
                    name="description"
                    content="Vous recherchez des pièces pour votre poêle ? Rendez vous sur stodac.fr, spécialiste dans vente d'accessoires et pièces détachées pour poêles à granulés de bois."
                />
            </Helmet>
            <main className="stodac-accueil">
                <Hero/>
                <TitleAndParagraph 
                title="Qui sommes nous ? "
                paragraph="Créé par une entreprise spécialisée dans le dépannage de poêles à granulés, nous avons créé Stodac pour permettre au plus grand nombre d’accéder aux pièces détachées."
                />
                <Frieze/>
                <ParagraphAndImg/>
                <TitleAndParagraph 
                title="Des Pièces d'exception"
                paragraph="Station technique des plus grandes marques, nous fournissons des pièces d’origine provenant dirèctement du fabriquant."
                paragraph2="Nous vous proposons un catalogue fournit comptant motoréducteurs, bougies/résistances, écrans, cartes électroniques, creusets/brasiers, ventilateurs, extracteurs des fumées, pressostats, déflecteurs, câblage, vermiculites intérieur, déflecteurs, vitres et différents accessoires."
                />
            </main>
        </>
    )
}

export default Accueil