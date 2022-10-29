import React from "react";
import "../assets/styles/components/pages/connexion.scss"
import Button from "../components/atoms/Button"
import Input from "../components/atoms/input";
import { useSelector, useDispatch } from "react-redux";
import { setConnected, setDisconnect } from "../assets/scripts/store/redux-slices/authentication";
import regex from "../assets/scripts/utils/regex";
import { reject } from "bcrypt/promises";

const Conexion = () => {
    const isLogedin = useSelector((state) => state.authentication.connected);
    const [isLogin, setIsLogin] = React.useState(true);
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");
    const [firstName, setFirstName] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [mobile, setMobile] = React.useState("");
    
    const dispatch = useDispatch();



    const validatedFields = () => {
        if (!isLogin) {
          return regex.mailValidation(email) && firstName !== "" && lastName !== "" && regex.passwordValidation(password) && password===confirmPassword && regex.phoneValidation(mobile)
        } else {
          return regex.mailValidation(email) && regex.passwordValidation(confirmPassword)
        }
    }




    const login = ()=>{
        // console.log(email)
        // console.log(password)

        fetch('https://stodac.fr/api-test/user/login/mail', {
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
            reject("mot de passe ou email incorrecte")
        })
        .then(data => dispatch(setConnected(data)))
        .catch(err => console.log("error when loging in", err))
    }
    const createAccount = ()=>{
        //console.log(email)        
        //console.log(password)    
        //console.log(confirmPassword)    
        //console.log(firstName)    
        //console.log(lastName)    
        //console.log(mobile)     
        //console.log(validatedFields())     
        if(validatedFields()) {
            fetch('https://stodac.fr/api-test/user/signup', {
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
                mobile: 33 + mobile,
            })

            }).then(function () {
                login();
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
    if(!isLogedin){

        return<section className={`login ${isLogin ? " " : "create"}`}>
            <h1>{isLogin ? "Conexion" : "Créer un compte"}</h1>
            <Input callBack={setEmail} type="text" placeHolder="Adresse Mail" />
            {
                !isLogin && (
                    <div className="nom-prenom">
                        <Input type="text" callBack={setLastName} placeHolder="Nom" />
                        <Input type="text" callBack={setFirstName} placeHolder="Prénom" />
                    </div>
                )
            }

                <Input callBack={setPassword} type="password" placeHolder="Mot de passe *" />

            {
                !isLogin && (
                    <>
                        <Input type="password" callBack={setConfirmPassword} placeHolder="Confirmez le mot de passe" />
                        <Input type="text" callBack={setMobile} placeHolder="Numéro de téléphone" />
                        <p>* Votre mot de passe doit être composé d'au moins 8 charactères dont une majuscule, une minuscule et un chiffre</p>
                    </>
                )
            }

            {
                isLogin && ( <a href="/mot-de-passe-oublie">Mot de passe oublié ? </a> )
            }

            <Button callBack={isLogin ? login : createAccount } color="green" type="text" content={isLogin ? "Se connecter" : "Créer mon compte"}/>
            <Button callBack={toggle} color="black" type="text" content={isLogin ? "Créer un compte" : "Se connecter"}/>
        </section>
    }else{

        return <section className={`login ${isLogin ? " " : "create"}`}>
            <h1>Vous êtes déjà connecté</h1>

            <Button callBack={logout} color="black" type="text" content="Se déconnecter"/>
        </section>
    }
}

export default Conexion