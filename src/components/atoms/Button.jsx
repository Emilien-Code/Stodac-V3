import React from "react";
import Icon from "../atoms/Icon"
import "../../assets/styles/components/atoms/buttons.scss"

const Button = ({content, type, color, value, callBack, maxValue}, ...props)=>{

    const more = ()=>{
        if( value < maxValue)
            callBack(value + 1);
    }
    const less = ()=>{
        if(value > 1)
            callBack(value - 1);
    }

    if(type === "svg") {
        return <button className={"button " + type + " " + color + " "}> <Icon type={content}/></button>
    }
    if(type === "text"){
        return <button className={"button " + type + " " + color + " "}><span className="span">{content}</span></button>
    }

    if(type === "qty-select"){
        return  <div className={"button " + type + " " + color + " "}>
                    <button className="less" onClick={less}><span className="span">-</span></button>
                    {value}
                    <button className="more" onClick={more}><span className="span">+</span></button>
                </div>

    }
}
export default Button