import React from "react";
import "../../assets/styles/components/modules/information.scss"
import Icon from "../atoms/Icon";
const Inforamtion = ({message, type})=>{

    return (
            <div className={`information ${type}`}>
                <Icon type="info"/>
                <p>{message}</p>
            </div>
    )
}
export default Inforamtion