import React from "react";
import "../../assets/styles/components/modules/ScrollingFrieze.scss"
import gsap from "gsap";

const isVisible = (element) => {
    const object = element.getBoundingClientRect();
    return object.top < window.innerHeight && object.bottom > 0;
}
const ScrollingFrieze = ()=>{

    React.useEffect(()=>{
        
        setTimeout(()=>{
            let scrollValue = 1
            let final = -1;
            let lastScroll = 0
            let currentScroll = 0
            
            window.addEventListener('scroll', ()=>{
                
                currentScroll = window.scrollY;

                if(lastScroll > currentScroll && currentScroll ){
                    scrollValue++
                }else{
                    scrollValue--
                }

                if(isVisible(document.querySelector(".stodac-scrolling-frieze"))){
                    
                    document.querySelectorAll(".stodac-scrolling-frieze .line").forEach((line, index) => {
                        gsap.to(line, {
                            x: (index%2 === 0 ? -1 : 1) * scrollValue// - window.innerWidth/2
                        })
                    })
                    
                }
                lastScroll = currentScroll

            })

        }, 500)
    }, [])

    return <div className="stodac-scrolling-frieze">
        <div className="line">     
            <span>Accompagnement.</span>
            <span>Professionnalisme.</span>
            <span>Engagement.</span>
            <span>Expertise.</span>
            <span>Choix.</span>
            <span>Qualité.</span>
            <span>Professionnalisme.</span>
            <span>Accompagnement.</span>
            <span>Professionnalisme.</span>
            <span>Engagement.</span>
            <span>Expertise.</span>
            <span>Choix.</span>
            <span>Qualité.</span>
            <span>Professionnalisme.</span>
            <span>Accompagnement.</span>
            <span>Professionnalisme.</span>
            <span>Engagement.</span>
            <span>Expertise.</span>
        </div>
        <div className="line">     
            <span>Accompagnement.</span>
            <span>Professionnalisme.</span>
            <span>Engagement.</span>
            <span>Expertise.</span>
            <span>Choix.</span>
            <span>Qualité.</span>
            <span>Professionnalisme.</span>
            <span>Accompagnement.</span>
            <span>Professionnalisme.</span>
            <span>Engagement.</span>
            <span>Expertise.</span>
            <span>Choix.</span>
            <span>Qualité.</span>
            <span>Professionnalisme.</span>
            <span>Accompagnement.</span>
            <span>Professionnalisme.</span>
            <span>Engagement.</span>
            <span>Expertise.</span>
        </div>
    </div>
}

export default ScrollingFrieze