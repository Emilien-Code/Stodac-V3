import React from "react";
import "../../assets/styles/components/atoms/input.scss";
const Input = ({type, placeHolder, className="ClassInput"})=>{
    switch (type){
        case 'text':
            return <input type="text" placeholder={placeHolder} className={className}/>
        case 'password':
            return <input type="password" placeholder={placeHolder} className={className}/>
        default : 
            return <>aucuns type correspondant</>
    }
}
export default Input