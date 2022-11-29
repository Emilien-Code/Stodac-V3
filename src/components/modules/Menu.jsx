import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCart, setMenu } from "../../assets/scripts/store/redux-slices/modals";
import "../../assets/styles/components/modules/menu.scss"
import { Link } from "react-router-dom"

const Menu = ()=>{
    const dispatch = useDispatch()
    const isMenuOpen = useSelector(state => state.modals.menu)

    if(isMenuOpen){

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