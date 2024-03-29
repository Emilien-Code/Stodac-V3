import React from "react";
import { useNavigate } from 'react-router-dom';
import formatNumber from "../assets/scripts/utils/priceNormalisation";
import { Helmet } from "react-helmet";
// SCSS
import "../assets/styles/components/pages/payement-commande.scss"

// Components 
import Bloc from "../components/sections/bloc"
import Button from "../components/atoms/Button";
import Input from "../components/atoms/input";

//Store
import { useSelector, useDispatch } from "react-redux";
import { setData, setDisconnect } from "../assets/scripts/store/redux-slices/authentication";


const Recap = ()=>{
    let navigate = useNavigate();
    const dispatch = useDispatch()

    
    const cart = useSelector((state) => state.cart)
    const authentication = useSelector((state) => state.authentication)

    const [adress, setAdress] = React.useState(null)
    const [isPushed, setIsPushed] = React.useState(false)

    React.useEffect(()=>{
        fetch(`https://stodac.fr/api/user/getinfos/${authentication.id}`,{
            method: 'get', 
            headers: new Headers({
                'Authorization': 'Bearer ' + authentication.token, 
            }), 
        })
        .then(response => {
            if(response.ok)
                return response.json()
            dispatch(setDisconnect())
        })
        .then(json => dispatch(setData(json[0])))
        .catch(err => console.log(err))
        
    }, [])

    const push = ()=>{
        let arePointRelaisDatas;
        let areDomicileData;
        let savedPointRelais = JSON.parse(localStorage.getItem("PDR"))

        if(cart.deliveryMode === "Point Relais"){
            arePointRelaisDatas = savedPointRelais && savedPointRelais.adresse1 !== "" &&  savedPointRelais.localite !== "" && savedPointRelais.codePostal !== ""
        }
        if(cart.deliveryMode==="Domicile"){
            areDomicileData = document.querySelector(".num").value !== "" && document.querySelector(".rue").value !== "" && document.querySelector(".ville").value !== "" &&  document.querySelector(".cp").value !== ""
        }
        
        
        if(areCGVAccepted && (arePointRelaisDatas || areDomicileData || cart.deliveryMode === "Sur Place")){
            setIsPushed(true)
        }


        setAdress( ()=> {

            if (cart.deliveryMode==="Point Relais"){
                return{
                    adresse: savedPointRelais.adresse1,
                    city: savedPointRelais.localite,
                    postCode: savedPointRelais.codePostal,
                    complement: ""
                }
            }
            if(cart.deliveryMode==="Domicile"){
                return {
                    streetNumber: document.querySelector(".num").value,
                    street: document.querySelector(".rue").value,
                    city: document.querySelector(".ville").value,
                    postCode: document.querySelector(".cp").value,
                    complement: document.querySelector(".complement").value
                }
            }
            if(cart.deliveryMode==="Sur Place"){
                return {
                    adresse: "11 Bis Rue de Lorraine",
                    city: "Damelevières",
                    postCode: "54360",
                    complement: ""
                }
            }

        })
    }

    const [areCGVAccepted, setAreCGVAccepted] = React.useState(false)
    const toggleCGV = ()=>{
        setAreCGVAccepted(!areCGVAccepted)
    }

    React.useEffect(()=>{


        if(isPushed){
            // Save infos to the back.


            const formatedCart = [];


            cart.cart.forEach(article => {
                formatedCart.push({
                    article: {
                        category: article.category,
                        img: article.img,
                        manufacturer: article.manufacturer,
                        name: article.name,
                        poids: article.poids,
                        price: article.price,
                        qty: article.qty,
                        reference: article.reference,
                        state: article.state,
                        __v: article.__v,
                        _id: article._id,
                    },
                    qty: article.quantity
                })
            });

            fetch(`https://stodac.fr/api/user/addpanier/${authentication.id}`, {
                method: 'POST', 
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + authentication.token, 
                }, 
                body: JSON.stringify({
                    userId: authentication.id,
                    panier: formatedCart,
                    adresseLivraison: adress,
                    modeDeLivraison: cart.deliveryMode
                })
            })
            .then(() => {
                localStorage.setItem('PDR', false)
                navigate(`/paiement-commande`)
            })
            .catch(err => console.log(err))
        } 

    }, [adress])

    return <>
        <Helmet>
            <title>
                Récapitulatif de votre commande | Stodac : Vente d'accessoires pour poêles à granulés
            </title>
        </Helmet>
        <div className="payement-command">
            <div className="bloc1">
                <Bloc type="Panier"/>
            </div>
            <div className="Bloc2">
                <Bloc type="Mode de livraison"/>
            </div>
            <div className="Bloc2">
                <Bloc type="Récapitulatif"/>
            </div>
            <div className="confirm">
                <div className="conditions-vente">
                    <Input type="checkbox" callBack={toggleCGV}/> <a href="/conditions-generales-de-vente" target="_blank">J’accepte les conditions générales de vente</a>
                </div>
                <Button type="text" content="Commander" isDisabled={!areCGVAccepted} color="green" callBack={push}/>
            </div>
        </div>
    </>
}
export default Recap