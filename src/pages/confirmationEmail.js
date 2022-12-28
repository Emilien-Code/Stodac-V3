import React from "react";
import Bubble from "../components/atoms/Bubbles"
import "../assets/styles/components/pages/404.scss"
import { useParams, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";
const ConfirmationEmail = ()=>{

    const email = useParams().email
    const path = useLocation().pathname
    const [isSucces, setIsSucces] = React.useState(false)

    React.useEffect(()=>{
        const listPath = path.split('/')
        let hash = ""
        for(let i=3; i<listPath.length; i++){
            hash = hash + '/' + listPath[i]
        }
        fetch("https://stodac.fr/api/user/verify/"+email+hash, {
            method: 'GET',
        })
        .then(response => {
            if(response.ok)
                setIsSucces(true)
                console.log("email OK")
                return response.json();
        })
        .catch(err => console.log("error email NOK : ", err))
        
    },[])

    return(
        <>
            <Helmet>
                <title>
                    Confiramtion de votre email | Stodac : Vente d'accessoires pour poêles à granulés
                </title>
            </Helmet>
            <div className="not-found">
                <h1 className="small">{isSucces ? "Email validée" : "Impossible de valider l'inscription, une erreur est survenue"}</h1>
                <Bubble text={isSucces ? "🎉" : "😞"} color={isSucces ? "green" : "red"} />
                <Bubble text={isSucces ? "🎉" : "😞"} color={isSucces ? "green" : "red"} />
                <Bubble text={isSucces ? "🎉" : "😞"} color={isSucces ? "green" : "red"} />
                <Bubble text={isSucces ? "🎉" : "😞"} color={isSucces ? "green" : "red"} />
                <Bubble text={isSucces ? "🎉" : "😞"} color={isSucces ? "green" : "red"} />
                <Bubble text={isSucces ? "🎉" : "😞"} color={isSucces ? "green" : "red"} />
            </div>
        </>
    )

}

export default ConfirmationEmail