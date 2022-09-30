import React from "react";
import Icon from "../atoms/Icon"
import Button from "../atoms/Button"
import "../../assets/styles/utils/variables.scss"
import "../../assets/styles/components/modules/header.scss"

const Header = ()=>{
    return (
        <header>
            <nav>
                <a href={`/`}>Stodac.</a>
                <ul className="links">
                    <li>
                        <a href={`/Boutique`}>Boutique</a>
                    </li>
                    <li>
                        <a href={`/MesCommandes`}>Mes commandes</a>
                    </li>
                    <li>
                        <a href={`/Assistance`}>Assistance</a>
                    </li>
                </ul>
                <ul className="buttons">
                    <li>
                        <Button type="svg" content="basket"/>
                    </li>
                    <li>
                        <a href={`/SeConecter`}>
                            <Icon type="login"/>
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