import React from "react";
import Bubble from "../components/atoms/Bubbles"
import "../assets/styles/components/pages/404.scss"
import { Helmet } from "react-helmet";
const NotFound = ()=>{
    let position = {}
    let cursor = {}
    let i = 0
    React.useEffect(()=>{
        window.addEventListener("mousemove", (e)=>{
           
            const x = e.clientX -  window.innerWidth/2
            const y = e.clientY -  window.innerHeight/2

            cursor = {
                x: x,
                y: y
            }
        })
        
        setInterval (refreshPosition,1000/60)

    },[])

  
    const lerp = (min, max, fraction) =>  {
        return (max - min) * fraction + min;
    }

    const refreshPosition = ()=>{
        const bubbles = document.querySelectorAll(".bubble")



        bubbles.forEach(bubble => {
            const rect = bubble.getBoundingClientRect()

            position = {
                x: (rect.right - rect.left) / 2 + rect.left * bubble.dataset.parallaxSpeed,
                y: (rect.bottom - rect.top) / 2 + rect.top * bubble.dataset.parallaxSpeed
            }
            

            bubble.style.transform = `translate(
                ${lerp(position.x, cursor.x, .5)}px,
                ${lerp(position.y, cursor.y, .5)}px
            )`

        });
    }

    return (
        <>
            <Helmet>
                <title>
                   La page n'a pas étée trouvé | Stodac : Vente d'accessoires pour poêles à granulés
                </title>
            </Helmet>
            <div className="not-found">
                <h1>404</h1>
                <p>La page que vous avez demandé n'existe pas</p>
                <Bubble text="👀" color="green" dataParallaxSpeed="0.3"/>
                <Bubble text="👀" color="green" dataParallaxSpeed="-0.1"/>
                <Bubble text="👀" color="green" dataParallaxSpeed="0.4"/>
                <Bubble text="👀" color="green" dataParallaxSpeed="-0.6"/>
                <Bubble text="👀" color="green" dataParallaxSpeed="-0.2"/>
                <Bubble text="👀" color="green" dataParallaxSpeed="0.1"/>
            </div>
        </>
    )
}
export default NotFound