import React from "react";
import "../assets/styles/components/pages/connexion.scss"
import Button from "../components/atoms/Button"
import Input from "../components/atoms/input";
const Conexion = () => {
    const [isLogin, setIsLogin] = React.useState(true);

    const toggle = ()=>{
        setIsLogin(!isLogin)
    }
    return <>
        <section className={`login ${isLogin ? " " : "create"}`}>
            <h1>{isLogin ? "Conexion" : "Créer un compte"}</h1>
            <Input type="text" placeHolder="Adresse Mail" />
            
            {
                !isLogin && (
                    <div className="nom-prenom">
                        <Input type="text" placeHolder="Nom" />
                        <Input type="text" placeHolder="Prénom" />
                    </div>
                )
            }
            
            <Input type="password" placeHolder="Mot de passe" />

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

            <Button color="green" type="text" content={isLogin ? "Se connecter" : "Créer mon compte"}/>
            <Button callBack={toggle} color="black" type="text" content={isLogin ? "Créer un compte" : "Se connecter"}/>
        </section>
    </>
}

export default Conexion