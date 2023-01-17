import React from "react"
import Input from "../components/atoms/input"
import Button from "../components/atoms/Button"
import "../assets/styles/components/pages/resetpassword.scss"
import regex from "../assets/scripts/utils/regex";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";

const ForgivenPassword = () => {

    const [email, setEmail] = React.useState()
    const [response, setResponse] = React.useState(false)
    const [isRequesting, setisRequesting] = React.useState(true)
    const [password, setpassword] = React.useState(true)
    const [confirmpassword, setconfirmpassword] = React.useState(true)
    const token = useParams()._token
    
    
    React.useEffect(()=>{
        if(token){
            setisRequesting(false)
        }
    },[])

    const sendMail = () => {
        if(email){

            fetch("https://stodac.fr/api/utils/requestResetPswd", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email: email})
            })
            .then(res => {
                if(res.ok){
                    setResponse("succes")
                }
            })
            .catch(setResponse("err"))
        }
    }

    const changepswd = () => {
        if(password && confirmpassword){

            if(regex.passwordValidation(password) && password === confirmpassword)
            
            fetch("https://stodac.fr/api/utils/ResetPswd", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    token: token,
                    password: password
                })
            })
            .then(res => {
                if(res.ok){
                    setResponse("succes")
                }
            })
            .catch(setResponse("err"))
        }
    }


    return <>
                <Helmet>
            <title>
                Mot de passe oublié | Stodac : Vente d'accessoires pour poêles à granulés
            </title>
        </Helmet>
    <section className="resetpassword">
        <aside>

            { isRequesting ? (
                response ? 
                
                response==='succes' ? <h1> Un message vous a été envoyé</h1> : <h1>Une erreur est survenue</h1>
                
                :   <>
                        <h1>Réinitialisation de votre mot de passe</h1>
                        <Input type="text" callBack={setEmail} placeHolder="Adresse mail"/>
                        <Button type="text" color="green" content="Réinitialiser le mot de passe" isDisabled={!email} callBack={sendMail}/>
                    </>
                ):(
                    response ? 
                    
                    response==='succes' ? <h1> Votre mot de passe a bien été changé</h1> : <h1>Une erreur est survenue</h1>
                    
                    : <>
                        <h1>Réinitialisation de votre mot de passe</h1>
                        <div className="row indication">
                            <p>Votre mot de passe doit contenir au moins 1 majuscule 1 chiffre et 8 caractères, </p>
                        </div>     
                        <div className="row">
                            <Input type="password" callBack={setpassword} placeHolder="Nouveau mot de passe"/>
                            <div className={`validator ${regex.passwordValidation(password) ? "green" : "red"}`}></div>   
                        </div>
                        
                        <div className="row">
                            <Input type="password" callBack={setconfirmpassword} placeHolder="Confirmation du mot de passe"/>
                            <div className={`validator ${password === confirmpassword ? "green" : "red"}`}></div>   
                        </div>
                        <Button type="text" color="green" isDisabled={!(regex.passwordValidation(password) && password === confirmpassword)} content="Réinitialiser le mot de passe" callBack={changepswd}/>
                    </>
                )
            }

        </aside>
        <aside>
            <h2>Réinitialisation du mot de passe.</h2>
            <p>Nous vous permettons de réinitialiser votre mot de passe. En entrant votre adresse mail, nous vous enverrons un lien valable une heure.</p>
            <h2>Que faire si je ne reçois pas de mail ?</h2>
            <p>Si après une demande de réinitialisation de votre mot de passe, vous ne recevez aucun mail*, assurez vous que l’adresse mail saisie est correcte et que vous avez bien un compte sur stodac.fr. 
                Si ces deux conditions sont validées, contactez notre support client en cliquant <a href="mailto:contact@stodac.fr">ici</a>.</p>
            <p className="asterisk">* L’envoi du mail peut prendre quelques minutes selon l’état des serveurs.</p>
        </aside>

    </section>
            </>
}

export default ForgivenPassword
