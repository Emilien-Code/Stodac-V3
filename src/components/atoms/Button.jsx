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
    const nextPage = (e)=>{
        e.preventDefault();
        
        callBack(true);
    }
    const prevPage = (e)=>{
        e.preventDefault();
        
        callBack(false);
    }
    const exec = (e)=>{
        e.preventDefault();
        callBack()
    }

    if(type === "svg") {
        return <div onClick={exec} className={"button " + type + " " + " "}> <Icon type={content}/></div>
    }
    if(type === "text"){
        return <button onClick={exec} className={"button " + type + " " + color + " "}><span className="span">{content}</span></button>
    }
    if(type === "selecteur"){
        return <button onClick={exec} className={"button " + type + " " + color + " "}><span className="span">{content}</span><Icon type="right"/></button>
    }
    if(type === "qty-select"){
        return  <div className={"button " + type + " " + color + " "}>
                    <button className="less" onClick={less}>-</button>
                    {value}
                    <button className="more" onClick={more}>+</button>
                </div>
    }
    if(type === "page-select"){
        return  <div className={"button " + type + " " + color + " "}>
                    <div className="less" onClick={prevPage}><Icon type="left"/></div>
                    {value}
                    <div className="more" onClick={nextPage}><Icon type="right"/></div>
                </div>
    }
}
export default Button