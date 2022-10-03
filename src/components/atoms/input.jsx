import React from "react";
import "../../assets/styles/components/atoms/input.scss";
const Input = ({type, placeHolder})=>{
    switch (type){
        case 'text':
            return <input type="text" placeholder={placeHolder}/>
        case 'password':
            return <input type="password" placeholder={placeHolder}/>
        default : 
            return <>aucuns type correspondant</>
    }
}
export default Input