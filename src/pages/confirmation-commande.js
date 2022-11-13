import React from "react";
import Bubble from "../components/atoms/Bubbles"
import "../assets/styles/components/pages/404.scss"
import { useSelector, useDispatch } from "react-redux";
import { removeAllProductsFromCart, checkQuantity } from "../assets/scripts/store/redux-slices/cart.js"
import formatNumber from "../assets/scripts/utils/priceNormalisation";
const ConfirmationCommande = ()=>{
    const cart = useSelector((state) => state.cart);
    const [isSucces, setIsSucces] = React.useState(true)
    const [command, setCommand] = React.useState([])
    const [deliveryPrice, setDeliveryPrice] = React.useState(0)
    const [total, setTotal] = React.useState(0)
    const dispatch= useDispatch()


    React.useEffect(()=>{
        setCommand(cart.cart)
        setDeliveryPrice(cart.deliveryPrice)
        setTotal(cart.total + cart.deliveryPrice)
        setIsSucces(window.location.href.includes("succes"))



        dispatch(removeAllProductsFromCart())
        dispatch(checkQuantity())
    },[])


    return (
        <div className="not-found">
            <h1 className="small">{isSucces ? "Merci pour votre commande" : "Une erreur est survenue"}</h1>
            <Bubble text={isSucces ? "🎉" : "😞"} color={isSucces ? "green" : "red"} />
            <Bubble text={isSucces ? "🎉" : "😞"} color={isSucces ? "green" : "red"} />
            <Bubble text={isSucces ? "🎉" : "😞"} color={isSucces ? "green" : "red"} />
            <Bubble text={isSucces ? "🎉" : "😞"} color={isSucces ? "green" : "red"} />
            <Bubble text={isSucces ? "🎉" : "😞"} color={isSucces ? "green" : "red"} />
            <Bubble text={isSucces ? "🎉" : "😞"} color={isSucces ? "green" : "red"} />
            <div className="recap-commande">
                <h2>Récapitulatif</h2>
                <hr></hr>
                {

                    command.map((el)=>{
                        return <div className="line">
                        <p>{el.name}</p>
                        <p>{el.quantity * el.price}€</p>
                    </div>
                    })  
                }

                <div className="line fdp">
                    <p>Frais de ports</p>
                    <p>{deliveryPrice}€</p>
                </div>

                <div className="line">
                    <p>Total TTC</p>
                    <p>{formatNumber(total)}€</p>
                </div>
            </div>
        </div>
    )
}
export default ConfirmationCommande