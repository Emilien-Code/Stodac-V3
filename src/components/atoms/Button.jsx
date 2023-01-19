import React from "react";
import Icon from "../atoms/Icon"
import "../../assets/styles/components/atoms/buttons.scss"
import { Link } from "react-router-dom";

const Button = ({content, type, color, value, callBack, maxValue, isDisabled=false}, ...props)=>{


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
        return <div onClick={exec} className={"button " + type + " "}> <Icon type={content}/></div>
    }
    if(type === "thin") {
        return <button onClick={exec} className={"thin-button " + type + " " + color + " "}>{content}</button>
    }
    if(type === "text"){
        return <button onClick={exec} className={"button " + `${isDisabled ? "disabled " : "" }` + type + " " + color + " "}><span className="span">{content}</span></button>
    }
    if(type === "link"){
        return <button onClick={exec} className={"button text " + `${isDisabled ? "disabled " : "" }` + type + " " + color + " "}><span className="span"><Link to="/boutique">{content}</Link></span></button>
    }
    if(type === "selecteur"){
        return <button onClick={exec} className={"button " + type + " " + color + " "}><span className="span">{content}</span><Icon type="right"/></button>
    }
    if(type === "qty-select"){
        return  <div className={"button " + type + " " + color + " "}>
                    <button className="less" onClick={prevPage}>-</button>
                    {value}
                    <button className="more" onClick={nextPage}>+</button>
                </div>
    }
    if(type === "page-select"){
        return  <div className={"button " + type + " " + color + " "}>
                    <div className="less" onClick={prevPage}><Icon type="left"/></div>
                    {value}/{maxValue}
                    <div className="more" onClick={nextPage}><Icon type="right"/></div>
                </div>
    }
    if(type==="radio"){
        return <div className="radio">
            <input type="radio" id={value} name="a" />
            <label for={value}>{content}</label>
      </div>

    }
}
export default Button