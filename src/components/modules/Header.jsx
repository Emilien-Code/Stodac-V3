import React from "react";
import Icon from "../atoms/Icon"
import Button from "../atoms/Button"
import "../../assets/styles/utils/variables.scss"
import "../../assets/styles/components/modules/header.scss"
import { setCart, setMenu } from "../../assets/scripts/store/redux-slices/modals";
import { useSelector, useDispatch } from "react-redux";

const Header = ()=>{

    const dispatch = useDispatch();
    
    const openCart = ()=>{
        dispatch(setCart(true))
    }
    const openMenue = ()=>{
        dispatch(setMenu(true))
    }
    const pushToLogin = ()=>{
        window.location.href = `/se-connecter`;

    }

    return (
        <header>
            <nav>
                <a className="header-stodac nav-link" href={`/`}>Stodac.</a>
                <ul className="links">
                    <li>
                        <a className="nav-link" href={`/boutique`}>Boutique</a>
                    </li>
                    <li>
                        <a  className="nav-link" href={`/mes-commandes`}>Mes commandes</a>
                    </li>
                    <li>
                        <a  className="nav-link" href={`/assistance`}>Assistance</a>
                    </li>
                </ul>
                <ul className="buttons">
                    <li className="nav-link">
                        <Button  type="svg" callBack={openCart} content="cart"/>
                    </li>
                    <li className="nav-link"  >
                        {/* <a className="nav-link" href={`/se-conecter`}> */}
                            <Button callBack={pushToLogin} type="svg" content="login"/>

                    </li>
                    <li>
                        <Button type="svg" callBack={openMenue} content="menu"/>
                    </li>
                </ul>
            </nav>
        </header>
    )
}
export default Header