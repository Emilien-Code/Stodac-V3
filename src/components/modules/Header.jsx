import React from "react";
import Button from "../atoms/Button"
import "../../assets/styles/utils/variables.scss"
import "../../assets/styles/components/modules/header.scss"
import { setCart, setMenu } from "../../assets/scripts/store/redux-slices/modals";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate} from "react-router-dom"


const Header = (props)=>{
    const cart = useSelector((state) => state.cart)
    let navigate = useNavigate();

    const isMenuOpen = useSelector(state => state.modals.menu)
    const dispatch = useDispatch();
    const openCart = ()=>{
        dispatch(setCart(true))
    }
    const openMenue = ()=>{
        dispatch(setMenu(!isMenuOpen))
    }
    const pushToLogin = ()=>{
        navigate(`/se-connecter`);
    }


    React.useEffect(()=>{
         
        let lastScroll = 0
        let currentScroll = 0
        document.addEventListener("scroll", ()=>{
            currentScroll = window.scrollY;
            
            if(lastScroll > currentScroll && currentScroll ){
                document.querySelector("header").style.top = "0px";
            }else{
                document.querySelector("header").style.top = "-125px";
            }


            lastScroll = currentScroll

        })
    },[])
    return (
        <header>
            <nav>
                <Link className="header-stodac nav-link" to={`/`}>Stodac.</Link>
                <ul className="links">
                    <li>
                        <Link className="nav-link" to={`/boutique`}>Boutique</Link>
                    </li>
                    <li>
                        <Link  className="nav-link" to={`/mon-espace`}>Mon espace</Link>
                    </li>
                    <li>
                        <Link  className="nav-link" to={`/assistance`}>Assistance</Link>
                    </li>
                </ul>
                <ul className="buttons">
                    <li className="nav-link">
                        {
                            cart.quantity ?
                            <Button  type="text" callBack={openCart} color="green" content={cart.quantity}/>
                            :
                            <Button  type="svg" callBack={openCart} content="cart"/>
                         }
                    </li>
                    <li className="nav-link"  >
                        {/* <Link className="nav-link" to={`/se-conecter`}> */}
                            <Button callBack={pushToLogin} type="svg" content="login"/>

                    </li>
                    <li>
                        {
                            !isMenuOpen ? 
                            <Button type="svg" callBack={openMenue} content="menu"/>
                            :
                            <Button type="svg" callBack={openMenue} content="crossMenu"/>
                        }
                    </li>
                </ul>
            </nav>
        </header>
    )
}
export default Header