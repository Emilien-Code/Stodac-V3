import React from "react";
import Icon from "../atoms/Icon"
import "../../assets/styles/components/atoms/buttons.scss"

const Button = ({content, type, color, value, callBack, maxValue}, ...props)=>{

    const more = (e)=>{
        e.preventDefault();
        if( value < maxValue)
            callBack(value + 1);
    }
    const less = (e)=>{
        e.preventDefault();
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
    if(type === "page-select"){
        return  <div className={"button " + type + " " + color + " "}>
                    <button className="less" onClick={callBack}><span className="span"><Icon type="left"/></span></button>
                    {value}
                    <button className="more" onClick={callBack}><span className="span"><Icon type="right"/></span></button>
                </div>
    }
}
export default Button