import React from "react";
import Button from "../atoms/Button"
import "../../assets/styles/components/modules/article.scss"
import { useSelector, useDispatch } from "react-redux";
import { addProductToCart, setTotalPrice } from "../../assets/scripts/store/redux-slices/cart";
import { removeProductFromCart, increaseQuantity, decreaseQuantity } from "../../assets/scripts/store/redux-slices/cart";

const Article = ({data, display})=>{
    const [quantity, setQuantity] = React.useState(display==='onCart' ? data.quantity : 1);
    const dispatch = useDispatch();

    const addToCart = ()=>{
        const datas = {...data};
        datas.quantity = parseInt(quantity)
        dispatch(addProductToCart(datas))
        dispatch(setTotalPrice())
    }
    const removeFromCart = ()=>{
        const id = {}
        id._id = data._id
        dispatch(removeProductFromCart(id));
        dispatch(setTotalPrice())
    }


    const changeQty = (isMore)=>{
        if(isMore){
            if(data.qty>quantity){
                setQuantity(quantity + 1)
                if(display==="onCart"){
                    dispatch(increaseQuantity({_id:data._id}))
                }
            }

        } else{
            if(quantity>1){
                setQuantity(quantity - 1)
                if(display==="onCart"){
                    dispatch(decreaseQuantity({_id:data._id}))

                }
            }
        }
        dispatch(setTotalPrice())
    }

    const pushToArticle = (e)=>{
        e.preventDefault()
        if(!(e.target.classList.contains("button") || e.target.classList.contains("less") || e.target.classList.contains("more") || e.target.classList.contains("span") || e.target.classList.contains("icon")))
            window.location.href = `/article/${data._id}`;
    }

    switch (display){
        case "boutique": 
            return (
                <a className={`article ${display}`} onClick={pushToArticle} href="/article">
                    <figure>
                        <picture>
                            <img src={data.img} alt={"illustration de " + data.name} />
                        </picture>
                        <figcaption>
                            <h2>{data.name ? data.name : "chargement..."}</h2>
                            <div className="bottom">
                                <span>{data.price}€</span>
                                <Button color="" type="qty-select" value={quantity} callBack={changeQty} content=""/>
                                <Button color="green" type="text" callBack={addToCart} content="Ajouter au pannier"/>
                            </div>
                        </figcaption>
                    </figure>
                </a>
            )
        case "onCart":
            return(
                <a className={`${display}`} onClick={pushToArticle} href="/article">
                    <figure>
                        <picture>
                            <img src={data.img} alt={"illustration de " + data.name} />
                        </picture>
                        <figcaption>
                            <div className="top">
                                <p>{data.name ? data.name : "chargement..."}</p>
                                <span>{data.price}€</span>
                            </div>
                            <div className="bottom">
                                <Button color="" type="qty-select" value={quantity} callBack={changeQty} content=""/>
                                <Button color="" type="svg" callBack={removeFromCart} content="delete"/>
                            </div>
                        </figcaption>
                    </figure>
                    <hr />
                </a>
            )
    }

}

export default Article