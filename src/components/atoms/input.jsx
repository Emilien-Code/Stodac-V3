import React from "react";
import "../../assets/styles/components/atoms/input.scss";
const Input = ({type, placeHolder, callBack, className="ClassInput"})=>{

    const addWord = (e)=>{
        callBack(e.target.value)
    }

    switch (type){
        case 'text':
            return <input className={className} type="text" onChange={addWord} placeholder={placeHolder}/>
        case 'password':
            return <input className={className} type="password" onChange={addWord} placeholder={placeHolder}/>
        case "checkbox": 
            return <input type="checkbox" onChange={addWord}/>
        default : 
            return <>aucuns type correspondant</>
    }
}
export default Input