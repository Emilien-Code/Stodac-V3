import React from "react";

import Frieze from "../components/sections/ScrollingFrieze"
import Hero from "../components/sections/hero"
import TitleAndParagraph from "../components/sections/TitleAndParagraph"
import ParagraphAndImg from "../components/sections/paragraphAndImg"
import { Helmet } from "react-helmet";

import "../assets/styles/components/pages/accueil.scss"


const Accueil = ()=>{
    return(<>
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