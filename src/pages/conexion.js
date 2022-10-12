import React from "react";
import "../assets/styles/components/pages/connexion.scss"
import Button from "../components/atoms/Button"
import Input from "../components/atoms/input";
import { useSelector, useDispatch } from "react-redux";
import { setConnected } from "../assets/scripts/store/redux-slices/authentication";


const Conexion = () => {
    const isLogedin = useSelector((state) => state.authentication.connected);
    console.log(useSelector(state => state.authentication))
    const [isLogin, setIsLogin] = React.useState(true);
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    

    const dispatch = useDispatch();

    const login = ()=>{
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
        .then(response => response.json())
        .then(data => dispatch(setConnected(data)))
        // .then(()=> window.location.href = "/")
        .catch(err => console.log("error when loging in", err))
    }
    const createAccount = ()=>{
        
    }
    const logout = ()=>{
        console.log("logout")
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
                        <Input type="text" placeHolder="Nom" />
                        <Input type="text" placeHolder="Prénom" />
                    </div>
                )
            }
            
            <Input callBack={setPassword} type="password" placeHolder="Mot de passe" />

            {
                !isLogin && (
                    <>
                        <Input type="password" placeHolder="Confirmez le mot de passe" />
                        <Input type="text" placeHolder="Numéro de téléphone" />
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