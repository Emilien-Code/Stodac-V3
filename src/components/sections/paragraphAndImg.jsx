import React from "react"
import desktopImg from "../../assets/images/pages/accueil/Desktop.jpg"
import mobileImg from "../../assets/images/pages/accueil/Mobile.png"
import "../../assets/styles/components/sections/stodacImgAndParagraph.scss"
const PAndI = ()=>{
    return(
        <section className="stodac-img-and-paragraph">
            <div className="paragraphs">
                <h1>Notre expertise</h1>
                <p>À travers Stodac, c’est plus de 10 ans d’expertise que nous mettons à votre disposition !</p>
                <p>En effet, depuis notre création en 2013, nous avons dépannés la plupart des marques présentes sur le marché. </p>
            </div>
            <div className="imgs">
                <picture>
                    <source 
                        srcSet={mobileImg}
                        media="(max-width:768px)"
                    />
                    <source 
                        srcSet={desktopImg}
                    />
                    <img src={desktopImg} alt="Illustration des stocks de stodac" data-isparallax="true" data-axe="vertical" data-translate-speed="0.2"/>
                </picture>
            </div>
        </section>
    )
    
}
export default PAndI