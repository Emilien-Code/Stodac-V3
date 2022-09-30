import React from "react";
import Icon from "../atoms/Icon"
import "../../assets/styles/components/atoms/buttons.scss"

const Button = ({content, type})=>{
    return  <button className={"button " + type}>
                {
                    type === "svg"  && (
                        <Icon type={content}/>
                    )
                }
            </button>
}
export default Button