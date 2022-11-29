import React from "react";
import "../../assets/styles/components/atoms/bubble.scss"



const Bubble = ({text, color, dataParallaxSpeed})=>{
    return <span className={`bubble ${color}`} data-parallax-speed={dataParallaxSpeed}> {text}</span>
}

export default Bubble