import React from "react";
import "../assets/styles/components/pages/connexion.scss"
import Button from "../components/atoms/Button"
import Input from "../components/atoms/input";
import { useSelector, useDispatch } from "react-redux";
import { setConnected, setDisconnect, setData } from "../assets/scripts/store/redux-slices/authentication";
import regex from "../assets/scripts/utils/regex";
import { Link, useParams, useNavigate } from "react-router-dom"
import Bubble from "../components/atoms/Bubbles";
import { Helmet } from "react-helmet";



const Conexion = () => {
    const isLogedin = useSelector((state) => state.authentication.connected);
    const authentication = useSelector((state) => state.authentication);
    const [isLogin, setIsLogin] = React.useState(true);
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");
    const [firstName, setFirstName] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [mobile, setMobile] = React.useState("");
    const [isCreated, setIsCreated] = React.useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const pushTo = useParams().pushTo
    const [error,setError] = React.useState("")

    React.useEffect(()=>{
        if(isLogedin || isCreated){
            navigate("/mon-espace")
        }
    },[])
    const validatedFields = () => {
        if (!isLogin) {
          return regex.mailValidation(email) && firstName !== "" && lastName !== "" && regex.passwordValidation(password) && password===confirmPassword && regex.phoneValidation(mobile)
        } else {
          return regex.mailValidation(email) && regex.passwordValidation(password)
        }
    }

    React.useEffect(()=>{
        setTimeout(()=>{
            setError("")
        },6000)
    },[error])

    const login = ()=>{
        fetch('https://stodac.fr/api/user/login/mail', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        .then(response => {
            if(response.ok)
                return response.json();
            setError("Adresse email ou mot de passe invalide.")
        })
        .then(data => {
            dispatch(setConnected(data))
            return data
        })
        .then((data)=>{
            fetch(`https://stodac.fr/api/user/getinfos/${data.userID}`,{
                method: 'get', 
                headers: new Headers({
                'Authorization': 'Bearer ' + data.token, 
                }), 
            })
            .then(response => response.json())
            .then(json => {
                dispatch(setData(json[0]));
                if(pushTo){
                    if(window.location.href.includes("admin")){
                        navigate(`/admin/${pushTo}`)
                    }else{
                        navigate(`/${pushTo}`)
                    }
                }else{
                    navigate(`/mon-espace`)
                }
            })
            .catch(err=> console.log(err))
        })
        .catch(err => console.log("error when loging in", err))
    }

    const createAccount = ()=>{   
        if(validatedFields()) {
            fetch('https://stodac.fr/api/user/signup', {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
            body: JSON.stringify({
                email: email,
                password: password,
                firstName: firstName,
                lastName: lastName,
                mobile: mobile,
            })
            }).then(function (res) {
                console.log(res)
                if(res.ok)
                    setIsCreated(true)
                else
                    setError("Adresse email déjà utilisée.")
            }).catch(function (error) {
                console.log(error)
            });
        }
    
    
    }
    const handleKeyDown = event => {
        if(event.key==="Enter"){
            if(isLogin) 
                login()
            else
                createAccount()
        }
      };
    const logout = ()=>{
        dispatch(setDisconnect())
    }

    const toggle = ()=>{
        setIsLogin(!isLogin)
    }

    if(!isLogedin && !isCreated){

        
            return <>
                <Helmet>
                    <title>
                        {`${isLogin ? "Se connecter" : "Créer un compte"}`} | Stodac : Vente d'accessoires pour poêles à granulés 
                    </title>
                    <meta
                        name="description"
                        content="Connectez vous à votre espace Stodac et profitez de vous vos avantages clients."
                    />
                </Helmet>
            <section className={`login ${isLogin ? " " : "create"}`}>
                {
                    error && <Bubble type="error" text={error}/>

                }
                <h1>{isLogin ? "Connexion" : "Créer un compte"}</h1>
                <div className="row">
                    <Input callBack={setEmail} type="text" placeHolder="Adresse mail" />
                    <div className={`validator ${regex.mailValidation(email) ? "green" : "red"}`}></div>   

                </div>
                {
                    !isLogin && (
                        <div className="nom-prenom">
                            <Input type="text" callBack={setLastName} placeHolder="Nom" />
                            <Input type="text" callBack={setFirstName} placeHolder="Prénom" />
                        </div>
                    )
                }
                    <div className="row">
                        {
                            isLogin ? 
                                <Input callBack={setPassword} type="password" handleKeyDown={handleKeyDown} placeHolder="Mot de passe" />
                                :
                                <Input callBack={setPassword} type="password" placeHolder="Mot de passe" />
                        }
                        <div className={`validator ${regex.passwordValidation(password) ? "green" : "red"}`}></div>   
                    </div>
                    {
                            !isLogin ? 
                    <div className="row indication">
                        <p>Votre mot de passe doit contenir au moins 1 majuscule 1 chiffre et 8 caractères, </p>
                    </div>     : <></>                
                    }

                {
                    !isLogin && (
                        <>
                            <div className="row">
                                <Input type="password" callBack={setConfirmPassword} placeHolder="Confirmer le mot de passe" />
                                <div className={`validator ${password===confirmPassword&&confirmPassword!=="" ? "green" : "red"}`}></div>   
                            </div>
                            <div className="row">
                                {
                                    isLogin ? 
                                    <Input type="text" callBack={setMobile} placeHolder="Numéro de téléphone" />
                                    :
                                    <Input type="text" callBack={setMobile} handleKeyDown={handleKeyDown} placeHolder="Numéro de téléphone" />

                                }
                                <div className={`validator ${regex.phoneValidation(mobile) ? "green" : "red"}`}></div>   
                            </div>
                        </>
                    )
                }

                {
                    isLogin && ( <Link to="/mot-de-passe-oublie">Mot de passe oublié ? </Link> )
                }

                <Button callBack={isLogin ? login : createAccount } isDisabled={!validatedFields()} color="green" type="text" content={isLogin ? "Se connecter" : "Créer mon compte"}/>
                <Button callBack={toggle} color="black" type="text" content={isLogin ? "Créer un compte" : "Se connecter"}/>
            </section>
            </>


    }else{
        if(isCreated){
            return <section className={`login ${isLogin ? " " : "create"}`}>
            <h1>Votre inscription à bien étée prise en compte.</h1>
            <p>Confirmez votre inscription dans vos mails pour continuer.</p>

        </section>
        }else{

            return <section className={`login ${isLogin ? " " : "create"}`}>
            <h1>Vous êtes déjà connecté</h1>

            <Button callBack={logout} color="black" type="text" content="Se déconnecter"/>
        </section>
        }
    }
}

export default Conexion
