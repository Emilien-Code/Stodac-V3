import React from "react";
import "../../assets/styles/components/atoms/input.scss";
import Icon from "./Icon";
const Input = ({type, placeHolder, defaultValue, callBack, className="ClassInput", selectValues=[]})=>{

    const addWord = (e)=>{
        callBack(e.target.value)
    }

    switch (type){
        case 'text':
            if(defaultValue){
                return <input className={className} defaultValue={defaultValue} type="text" onChange={addWord} placeholder={placeHolder}/>
            }
            return <input className={className} type="text" onChange={addWord} placeholder={placeHolder}/>
        case 'locked-text': 
            return <input className={className} defaultValue={defaultValue} type="text" disabled onChange={addWord} placeholder={placeHolder}/>
        case 'number':
            return <input className={className} type="number" onChange={addWord} placeholder={placeHolder}/>
        case 'password':
            return <input className={className} type="password" onChange={addWord} placeholder={placeHolder}/>
        case "checkbox": 
            return <input type="checkbox" onChange={addWord}/>
        case "select": 
            return <div className="select-container">
                <Icon type="downarrow"/>
                <select onChange={(e)=>{ callBack(e.target.value) }}>
                {defaultValue === "Marques" || defaultValue === "Categories" ? <option value={""} selected>{defaultValue}</option> : ""}
                {
                    selectValues.map((value)=> {
                        if(value === defaultValue){
                            return <option selected key={value} value={value}>{value}</option>
                        }
                        return <option value={value} key={value}>{value}</option>
                    })
                }
                </select>
            </div>
        default : 
            return <>aucuns type correspondant</>
    }
}
export default Input