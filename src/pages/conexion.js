import React from "react";
import "../assets/styles/components/pages/connexion.scss"
import Button from "../components/atoms/Button"
import Input from "../components/atoms/input";
import { useSelector, useDispatch } from "react-redux";
import { setConnected, setDisconnect, setData } from "../assets/scripts/store/redux-slices/authentication";
import regex from "../assets/scripts/utils/regex";
import { Link, useParams, useNavigate } from "react-router-dom"


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

    React.useEffect(()=>{
        if(isLogedin || isCreated){
            navigate("/mon-espace")
        }
    })
    const validatedFields = () => {
        if (!isLogin) {
          return regex.mailValidation(email) && firstName !== "" && lastName !== "" && regex.passwordValidation(password) && password===confirmPassword && regex.phoneValidation(mobile)
        } else {
          return regex.mailValidation(email) && regex.passwordValidation(confirmPassword)
        }
    }

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
            console.log("mot de passe ou email incorrecte")
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
            .catch(err => console.log(err))
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
            }).then(function () {
                console.log('ok')
                setIsCreated(true)
            }).catch(function (error) {
              console.log(error);
            });
        }
    
    
    }

    const logout = ()=>{
        dispatch(setDisconnect())
    }

    const toggle = ()=>{
        setIsLogin(!isLogin)
    }

    if(!isLogedin && !isCreated){

        
            return <section className={`login ${isLogin ? " " : "create"}`}>
                <h1>{isLogin ? "Conexion" : "Créer un compte"}</h1>
                <div className="row">
                    <Input callBack={setEmail} type="text" placeHolder="Adresse Mail" />
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
                        <Input callBack={setPassword} type="password" placeHolder="Mot de passe" />
                        <div className={`validator ${regex.passwordValidation(password) ? "green" : "red"}`}></div>   
                    </div>

                {
                    !isLogin && (
                        <>
                            <div className="row">
                                <Input type="password" callBack={setConfirmPassword} placeHolder="Confirmez le mot de passe" />
                                <div className={`validator ${password===confirmPassword&&confirmPassword!=="" ? "green" : "red"}`}></div>   
                            </div>
                            <div className="row">
                                <Input type="text" callBack={setMobile} placeHolder="Numéro de téléphone" />
                                <div className={`validator ${regex.phoneValidation(mobile) ? "green" : "red"}`}></div>   
                            </div>
                        </>
                    )
                }

                {
                    isLogin && ( <Link to="/mot-de-passe-oublie">Mot de passe oublié ? </Link> )
                }

                <Button callBack={isLogin ? login : createAccount } color="green" type="text" content={isLogin ? "Se connecter" : "Créer mon compte"}/>
                <Button callBack={toggle} color="black" type="text" content={isLogin ? "Créer un compte" : "Se connecter"}/>
            </section>


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