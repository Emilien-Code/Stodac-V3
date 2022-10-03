import React from "react";
import Button from "../atoms/Button"
import "../../assets/styles/components/modules/article.scss"
import { useSelector, useDispatch } from "react-redux";
import { addProductToCart } from "../../assets/scripts/store/redux-slices/cart";

const Article = ({data, display})=>{

    const [quantity, setQuantity] = React.useState(1)
    const dispatch = useDispatch();

    const addToCart = ()=>{
        const datas = {...data};
        datas.quantity = parseInt(quantity)
        dispatch(addProductToCart(datas))
    }

    const pushToArticle = (e)=>{
        e.preventDefault()
        if(!(e.target.classList.contains("button") || e.target.classList.contains("less") || e.target.classList.contains("more") || e.target.classList.contains("span")))
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
                                <Button color="" type="qty-select" value={quantity} callBack={setQuantity} maxValue={data.qty}  content=""/>
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
                                <Button color="" type="qty-select" value={quantity} callBack={setQuantity} maxValue={data.qty}  content=""/>
                            </div>
                        </figcaption>
                    </figure>
                </a>
            )
    }

}

export default Article