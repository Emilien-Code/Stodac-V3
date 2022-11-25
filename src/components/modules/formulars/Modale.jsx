import React from "react";
import Button from "../../atoms/Button";
import "../../../assets/styles/components/modules/formulars/modale.scss";
const Modale = ({valid, unvalid, text, noCallBack, yesCallback})=> {
    return <div className="modale">
        <h2>{text}</h2>
        <div>
            <Button color="black" type="text" content={unvalid} callBack={()=>noCallBack()}/>
            <Button color="green" type="text" callBack={()=>yesCallback()} content={valid}/>
        </div>
    </div>
}

export default Modale