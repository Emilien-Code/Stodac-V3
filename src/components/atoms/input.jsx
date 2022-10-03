import React from "react";
import "../../assets/styles/components/atoms/input.scss";
const Input = ({type, placeHolder, callBack})=>{

    const addWord = (e)=>{
        callBack(e.target.value)
    }

    switch (type){
        case 'text':
            return <input type="text" onChange={addWord} placeholder={placeHolder}/>
        case 'password':
            return <input type="password" onChange={addWord} placeholder={placeHolder}/>
        default : 
            return <>aucuns type correspondant</>
    }
}
export default Input