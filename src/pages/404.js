import React from "react";
import Bubble from "../components/atoms/Bubbles"
import "../assets/styles/components/pages/404.scss"
const NotFound = ()=>{
    return (
        <div className="not-found">
            <h1>404</h1>
            <p>La page que vous avez demandé n'existe pas</p>
            <Bubble text="👀" color="green" />
            <Bubble text="👀" color="green" />
            <Bubble text="👀" color="green" />
            <Bubble text="👀" color="green" />
            <Bubble text="👀" color="green" />
            <Bubble text="👀" color="green" />
        </div>
    )
}
export default NotFound