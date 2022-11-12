import React from "react";

// SCSS
import "../assets/styles/components/pages/payement-commande.scss"

// Components 
import Bloc from "../components/sections/bloc"
import Button from "../components/atoms/Button";
import Input from "../components/atoms/input";

//Store
import { useSelector, useDispatch } from "react-redux";
import { setData } from "../assets/scripts/store/redux-slices/authentication";


const Recap = ()=>{
    const dispatch = useDispatch()

    
    const cart = useSelector((state) => state.cart)
    const authentication = useSelector((state) => state.authentication)

    const [adress, setAdress] = React.useState(null)
    const [isPushed, setIsPushed] = React.useState(false)

    React.useEffect(()=>{
        fetch(`https://stodac.fr/api-test/user/getinfos/${authentication.id}`,{
            method: 'get', 
            headers: new Headers({
                'Authorization': 'Bearer ' + authentication.token, 
            }), 
        })
        .then(response => response.json())
        .then(json => dispatch(setData(json[0])))
        .catch(err => console.log(err))
    })

    const push = ()=>{
        setIsPushed(true)
        setAdress( ()=> {

            if (cart.deliveryMode==="Point Relais"){
                return{
                    adress: document.getElementById("pudoWidgetAddress1").value,
                    city: document.getElementById("pudoWidgetTown").value,
                    postCode: document.getElementById("pudoWidgetZipCode").value
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
            if(cart.deliveryMode=="Sur Place"){
                return {
                    adresse: "11 Bis Rue de Lorraine",
                    city: "Damelevières",
                    postCode: "54360"
                }
            }

        })
    }

    React.useEffect(()=>{


        if(isPushed){
            // Save infos to the back.


            const formatedCart = [];


            cart.cart.forEach(article => {
                formatedCart.push({
                    article: {
                        category: article.category,
                        commentaires: article.commentaires,
                        compatibility: article.compatibility,
                        description: article.description,
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


            const infosToSend = {
                panier: formatedCart,
                adresseLivraison: adress,
                modeDeLivraison: cart.deliveryMode
            }


            // console.log(infosToSend)

            fetch(`www.stodac.fr/api-test/user/addpanier/${authentication.id}`, {
                method: 'post', 
                headers: new Headers({
                    'Authorization': 'Bearer ' + authentication.token, 
                }), 
            })
            .then(() => window.location.href = `/paiement-commande`)
            .catch(err => console.log(err))
        } 

    }, [adress])

    return <div className="payement-command">
        <div className="bloc1">
            <Bloc type="Panier"/>
        </div>
        <div className="Bloc2">
            <Bloc type="Mode de livraison"/>
        </div>
        <div className="confirm">
            <div className="conditions-vente">
                <Input type="checkbox"/> <a href="/conditions-generales-de-vente" target="_blank">J’accepte les conditions générales de vente</a>
            </div>
            <Button type="text" content="Commander" color="green" callBack={push}/>
        </div>
    </div>
}
export default Recap