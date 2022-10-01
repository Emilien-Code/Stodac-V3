import React from "react";
import Icon from "../atoms/Icon"
import Button from "../atoms/Button"
import "../../assets/styles/utils/variables.scss"
import "../../assets/styles/components/modules/header.scss"

const Header = ()=>{
    return (
        <header>
            <nav>
                <a className="header-stodac nav-link" href={`/`}>Stodac.</a>
                <ul className="links">
                    <li>
                        <a className="nav-link" href={`/Boutique`}>Boutique</a>
                    </li>
                    <li>
                        <a  className="nav-link" href={`/MesCommandes`}>Mes commandes</a>
                    </li>
                    <li>
                        <a  className="nav-link" href={`/Assistance`}>Assistance</a>
                    </li>
                </ul>
                <ul className="buttons">
                    <li className="nav-link">
                        <Button  type="svg" content="basket"/>
                    </li>
                    <li>
                        <a className="nav-link" href={`/SeConecter`}>
                            <Icon className="nav-link" type="login"/>
                        </a>
                    </li>
                    <li>
                        <Button type="svg" content="menu"/>
                    </li>
                </ul>
            </nav>
        </header>
    )
}
export default Header