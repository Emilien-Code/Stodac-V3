import React from "react";
import Button from "../atoms/Button"
import "../../assets/styles/components/modules/article.scss"
import { useDispatch } from "react-redux";
import { addProductToCart, setTotalPrice } from "../../assets/scripts/store/redux-slices/cart";
import { removeProductFromCart, increaseQuantity, decreaseQuantity, checkQuantity } from "../../assets/scripts/store/redux-slices/cart";
import { Link } from "react-router-dom";
import formatNumber from "../../assets/scripts/utils/priceNormalisation"


import Accordeon from "../atoms/accordeon"
//import Bubble from "../atoms/Bubbles"

const Article = ({data, display})=>{
    const [quantity, setQuantity] = React.useState(display==='onCart' ? data.quantity : 1);
    const dispatch = useDispatch();
    //Actualize array when remove article
    if(display==='onCart' && (data.quantity !== quantity)){
        setQuantity(data.quantity);
    }
    // const history = useHistory()
    const addToCart = ()=>{
        const datas = {...data};
        datas.quantity = parseInt(quantity)
        dispatch(addProductToCart(datas))
        dispatch(setTotalPrice())
        dispatch(checkQuantity())

    }
    const removeFromCart = ()=>{
        const id = {}
        id._id = data._id
        dispatch(removeProductFromCart(id));
        dispatch(setTotalPrice())
        dispatch(checkQuantity())

    }

    if(display==="fullPage") window.scrollTo(0, 125)


    const changeQty = (isMore)=>{
        if(isMore){
            setQuantity(quantity + 1)
            if(display==="onCart"){
                dispatch(increaseQuantity({_id:data._id}))
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
        dispatch(checkQuantity())
    }
    
    switch (display){
        case "boutique": 
            return (
                <Link className={`article ${display}`} /*onClick={pushToArticle}*/ to={`/article/${data._id}`}>
                    <figure>
                        <picture>
                            <img src={data.img} alt={"illustration de " + data.name} />
                        </picture>
                        <figcaption>
                            <h2>{data.name ? data.name : "chargement..."}</h2>
                            <div className="bottom">
                                <span>{data.price ? `${formatNumber(data.price)}€` : ""}</span>{/* {data.manufacturer ? <Bubble text={data.manufacturer} color="grey"/> : ""} {data.category ? <Bubble text={data.category} color="grey"/> : ""}*/}
                                <Button color="" type="qty-select" value={quantity} callBack={changeQty} content=""/>
                                <Button color="green" type="text" callBack={addToCart} content="Ajouter au pannier"/>
                            </div>
                        </figcaption>
                    </figure>
                </Link>
            )
        case "onCart":
            return(
                <div className={`${display}`}>
                    <figure>
                        <picture>
                            <img src={data.img} alt={"illustration de " + data.name} />
                        </picture>
                        <figcaption>
                            <div className="top">
                                <p>{data.name ? data.name : "chargement..."}</p>
                                <span>{formatNumber(data.price)}€</span>
                            </div>
                            <div className="bottom">
                                <Button color="" type="qty-select" value={quantity} callBack={changeQty} content=""/>
                                <Button color="" type="svg" callBack={removeFromCart} content="delete"/>
                            </div>
                        </figcaption>
                    </figure>
                    <hr />
                </div>
            )
        case "fullPage":
            return (
                <figure className="fullPage">
                <picture>
                    <img src={data.img} alt={"illustration de " + data.name} />
                </picture>
                <figcaption>
                    <div className="top">
                        <h1>{data.name ? data.name : "chargement..."}</h1>
                        <section>
                            <article>
                                <p>Marque</p>
                                <p>{data.manufacturer}</p>
                            </article>
                            <article>
                                <p>Reference</p>
                                <p>{data.reference}</p>
                            </article>
                            <article>
                                <p>Prix</p>
                                <p>{formatNumber(data.price)}€</p>
                            </article>
                        </section>
                        <section>
                            <Button color="" type="qty-select" value={quantity} callBack={changeQty} content=""/>
                            <Button color="green" type="text" callBack={addToCart} content="Ajouter au pannier"/>
                        </section>
                        <p>{data.description}</p>
                        {/* A mettre dans un component */}
                        <Accordeon type="compatibilities" title="Modèles compatibles" content={data.compatibility}/>
                        <Accordeon type="technique" title="Fiche technique" content={[data.name, data.manufacturer, data.reference, data.state]}/>
                        <hr />
                    </div>
                </figcaption>
            </figure>
            )
            case "onSearch":
                return(
                    <Link to={`/article/${data._id}`} className={`${display}`}>
                        <figure>
                            <picture>
                                <img src={data.img} alt={"illustration de " + data.name} />
                            </picture>
                            <figcaption>
                                <p>{data.name ? data.name : "chargement..."}</p>
                                <span>{formatNumber(data.price)}€</span>
                            </figcaption>
                        </figure>
                        {/* <hr /> */}
                    </Link>
                )
            default:
                return ""
            }

}

export default Article