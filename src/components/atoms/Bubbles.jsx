import React from "react";
import "../../assets/styles/components/atoms/bubble.scss"



const Bubble = ({text, color})=>{
    return <span className={`bubble ${color}`}> {text }</span>
}

export default Bubble