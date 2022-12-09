import React from "react";
import "../../assets/styles/components/atoms/bubble.scss"
import gsap from "gsap";


const Bubble = ({text, type, color, dataParallaxSpeed})=>{

    React.useEffect(()=>{
        if(type === "error"){
            gsap.fromTo('.error-popup',
            {
                opacity:0,
                y:-100
            },{
                opacity:1,
                y:0,
                duration: .5,
            })
        }
        setTimeout(()=>{
            gsap.fromTo('.error-popup',
            {
                opacity:1,
                y:0
            },{
                opacity:0,
                y:-100,
                duration: .5,
            })
        },5000)
    },[])



    switch(type){
    case 'error':
        return <span className="error-popup"> {text}</span>
    default:   
        return <span className={`bubble ${color}`} data-parallax-speed={dataParallaxSpeed}> {text}</span>
    }
}

export default Bubble