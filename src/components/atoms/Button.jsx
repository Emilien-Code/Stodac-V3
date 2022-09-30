import React from "react";
import Icon from "../atoms/Icon"
import "../../assets/styles/components/atoms/buttons.scss"

const Button = ({content, type, color})=>{
    if(type === "svg") {
        return <button className={"button " + type + " " + color}> <Icon type={content}/></button>
    }
    if(type === "text"){
        return <button className={"button " + type + " " + color}>{content}</button>
    }

    if(type === "qty-select"){
        return  <div className={"button " + type + " " + color}>
                    <button>-</button>
                    0
                    <button>+</button>
                </div>

    }
}
export default Button