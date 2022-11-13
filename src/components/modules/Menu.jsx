import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCart, setMenu } from "../../assets/scripts/store/redux-slices/modals";
import "../../assets/styles/components/modules/menu.scss"
const Menu = ()=>{
    const dispatch = useDispatch()
    const isMenuOpen = useSelector(state => state.modals.menu)

    if(isMenuOpen){

        return <div className="menu">
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
        </div>
    }else{
        return <></>
    }
}

export default Menu