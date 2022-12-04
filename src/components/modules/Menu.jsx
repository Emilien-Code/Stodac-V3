import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCart, setMenu } from "../../assets/scripts/store/redux-slices/modals";
import "../../assets/styles/components/modules/menu.scss"
import { Link } from "react-router-dom"
import gsap from "gsap";

const Menu = ()=>{
    const dispatch = useDispatch()
    const isMenuOpen = useSelector(state => state.modals.menu)
    const tl = gsap.timeline({})
    const [isShown, setIsShown] = React.useState(false)

    React.useEffect(()=>{

        const $body = document.querySelector("body")
        if(isMenuOpen){
            setIsShown(true)
            $body.style.overflow = 'hidden';
            $body.style.position = 'fixed';
            $body.style.width = '100%';
            setTimeout(()=>{

                document.querySelector(".transition-bg").style.display = "block";
                tl.fromTo(".menu",{
                    y: '-100%',
                    rotate: '-5deg',
                    width: '120%',
                    x: -100
                },{
                    y: 0,
                    x:0,
                    rotate: '0deg',
                    duration: 0.5,
                    width: '100%'
                })
                tl.fromTo(
                    ".menu li",
                    {
                        x: -100,
                        opacity : 0,
                    },{
                        x: 0,
                        opacity : 1,
                        stagger: .1
                    }
                    )
                    gsap.fromTo(".transition-bg",{
                        top:0,
                        opacity:0
                    },{
                        opacity: 1,
                        duration: 0.5
                    })
                    
                }, 50)
                }else{
                    $body.style.overflow = 'hidden auto';
            $body.style.removeProperty('position');
            $body.style.removeProperty('top');
            $body.style.removeProperty('width');




            tl.to(
                ".menu li",{
                    x: -100,
                    opacity : 0,
                    stagger: .1
                }
            )
            tl.to(".menu",{
                y: '-110%',
                x: -100,
                rotate: '-5deg',
                duration: 0.5,
                width: '120%',
                onComplete: ()=>{
                    setTimeout(()=>{document.querySelector(".transition-bg").style.display = "none";},800)

                }
            })
            gsap.fromTo(".transition-bg",{
                opacity: 1,

            },{
                opacity: 0,
                duration: 0.5
            })




        }


    },[isMenuOpen])


    if(isShown){

        return <div className="menu">
            <ul className="links">
                <li>
                    <Link className="nav-link" to={`/boutique`}>Boutique</Link>
                </li>
                <li>
                    <Link  className="nav-link" to={`/mes-commandes`}>Mes commandes</Link>
                </li>
                <li>
                    <Link  className="nav-link" to={`/assistance`}>Assistance</Link>
                </li>
            </ul>
        </div>
    }else{
        return <></>
    }
}

export default Menu