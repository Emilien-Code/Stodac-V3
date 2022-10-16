import React from "react";
import "../../assets/styles/components/modules/information.scss"
import Icon from "../atoms/Icon";
const Inforamtion = ({message})=>{

    return (
        <>
            <div className="information">
                <Icon type="info"/>
                <p>{message}</p>
            </div>
        </>
    )
}
export default Inforamtion