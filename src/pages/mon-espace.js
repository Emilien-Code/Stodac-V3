import React from "react";
import "../assets/styles/components/pages/mon-espace.scss"
import Button from "../components/atoms/Button";
import Input from "../components/atoms/input";
import MesCommandes from "./mes-commandes";
import { useDispatch, useSelector } from "react-redux";
import { setDisconnect, setData } from "../assets/scripts/store/redux-slices/authentication";
const MonEspace = ()=>{
    const [selected,setSelected] = React.useState("Mon compte")
    const user = useSelector((state) => state.authentication)
    const dispatch = useDispatch();
    const [isValid,setIsValid] = React.useState(true)
    const [streetNumber, setStreetNumber] = React.useState("")
    const [isStreetnumberLocked, setIsStreetNumberLocked] = React.useState(true)
    
    const [street, setStreet] = React.useState("")
    const [isStreetLocked, setIsStreetLocked] = React.useState(true)

    const [mobile, setMobile] = React.useState("")
    const [isMobileLocked, setIsMobileLocked] = React.useState(true)

    const [city, setCity] = React.useState("")
    const [isCityLocked, setIsCityLocked] = React.useState(true)

    const [postCode, setPostCode] = React.useState("")
    const [isPostCodeLocked, setIsPostCodeLocked] = React.useState(true)

    const [complement, setComplement] = React.useState("")
    const [isComplementLocked, setIsComplementLocked] = React.useState(true)


 

    const logout = ()=>{
        dispatch(setDisconnect())
    }

    React.useEffect(()=>{
        if(!(isStreetnumberLocked && isStreetLocked && isMobileLocked && isCityLocked  && isPostCodeLocked && isComplementLocked)){
           setIsValid(true)
        }else{
            setIsValid(false)
        }

    }, [streetNumber, street, mobile, city, postCode, complement])

    const send = ()=>{
        if(isValid){
            fetch(`https://stodac.fr/api/user/changeUser/${user.id}`, {
                method: 'POST', 
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + user.token, 
                }, 
                body: JSON.stringify({
                    userName: user.data.email,
                    tel: mobile==="" ? user.data.mobile : mobile,
                    street: street==="" ? user.data.street : street ,
                    city: city==="" ? user.data.city : city ,
                    streetNumber: streetNumber==="" ? user.data.streetNumber : streetNumber ,
                    postCode: postCode==="" ? user.data.postCode : postCode ,
                    entreprise: user.data.entreprise,
                    complement: complement==="" ? user.data.complement : complement,
                })  
                    
            })
            .then((e)=>{
                fetch(`https://stodac.fr/api/user/getinfos/${user.id}`,{
                    method: 'get', 
                    headers: new Headers({
                        'Authorization': 'Bearer ' + user.token, 
                    }), 
                })
                .then(response => {
                    if(response.ok)
                        return response.json()
                    dispatch(setDisconnect())
            })
            .then(json => {
                dispatch(setData(json[0]))
                setIsComplementLocked(true)
                setIsPostCodeLocked(true)
                setIsCityLocked(true)
                setIsMobileLocked(true)
                setIsStreetLocked(true)
                setIsStreetNumberLocked(true)
                setIsValid(false)

            })
                    })
                    .catch((err)=>{console.log("err", err)})
                }
            }

    return <main className="mon-espace">
        <header>
            <h1>Bienvenu(e) {user.data.firstName}</h1>
            <Button color="black" type="text" content="Déconexion" callBack={logout}/>
        </header>
        <nav>
            <Button type="thin" content="Mon compte" color={selected==="Mon compte" ? "black" : "grey"} callBack={()=>{ setSelected("Mon compte") }}/>
            <Button type="thin" content="Mes commandes" color={selected==="Mes commandes" ? "black" : "grey"} callBack={()=>{ setSelected("Mes commandes") }}/>
        </nav>
        {
            selected==="Mes commandes" ? <MesCommandes/> : ""
        }
        {
            selected==="Mon compte" ? <div className="mon-compte">
                <h1>Informations du compte</h1>

                <div>
                <Input type="locked-text" defaultValue={user.data.lastName} isLocked={true}/> 
                </div>
                <div>
                <Input type="locked-text" defaultValue={user.data.firstName} isLocked={true}/>
                </div>
                <div>
                    <Input type="locked-text" defaultValue={user.data.email} isLocked={true}/>
                </div>
                <div>
                    <Input type={isStreetnumberLocked ? "locked-text" : "text"} defaultValue={user.data.streetNumber} isLocked={isStreetnumberLocked} callBack={(e)=> setStreetNumber(e)} placeHolder="Numéro de rue"/>   
                    <Button type="thin" content="MODIFIER" callBack={()=>{setIsStreetNumberLocked(false)}}/>
                </div>     
                <div>
                    <Input type={isStreetLocked ? "locked-text" : "text"} defaultValue={user.data.street} isLocked={true} callBack={(e)=> setStreet(e)} placeHolder="Rue"/>         
                    <Button type="thin" content="MODIFIER" callBack={()=>{setIsStreetLocked(false)}}/>
                </div>                    
                <div>
                    <Input type={isMobileLocked ? "locked-text" : "text"} defaultValue={user.data.mobile} isLocked={true} callBack={e=>setMobile(e)} placeHolder="Numéro de téléphone"/>     
                    <Button type="thin" content="MODIFIER" callBack={()=>{setIsMobileLocked(false)}}/>
                </div>
                <div>
                    <Input type={isCityLocked ? "locked-text" : "text"} defaultValue={user.data.city} isLocked={true}callBack={e=>setCity(e)} placeHolder="Ville"/>           
                    <Button type="thin" content="MODIFIER" callBack={()=>{setIsCityLocked(false)}}/> 
                </div>   
                <div>
                    <Input type={isPostCodeLocked ? "locked-text" : "text"} defaultValue={user.data.postCode} isLocked={true} callBack={e=>setPostCode(e)} placeHolder="Code postale"/>       
                    <Button type="thin" content="MODIFIER" callBack={()=>{setIsPostCodeLocked(false)}}/>
                </div>     
                <div>
                    <Input type={isComplementLocked ? "locked-text" : "text"} defaultValue={user.data.complement} isLocked={true} callBack={e=>setComplement(e)} placeHolder="Complément"/>     
                    <Button type="thin" content="MODIFIER" callBack={()=>{setIsComplementLocked(false)}}/> 
                </div>           
                <Button type="text" color={'green'} isDisabled={!isValid}content="Enregistrer" callBack={send}/>
            </div> : ""
            
        }
        </main>


}

export default MonEspace;