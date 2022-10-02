import React from "react";
import Button from "../atoms/Button"
import "../../assets/styles/components/modules/article.scss"
const Article = ({data})=>{

    const [quantity, setQuantity] = React.useState(1)


    const pushToArticle = (e)=>{
        e.preventDefault()
        if(!(e.target.classList.contains("button") || e.target.classList.contains("less") || e.target.classList.contains("more") || e.target.classList.contains("span")))
            window.location.href = `/article/${data._id}`;
    }

    return (
        <a className="article" onClick={pushToArticle} href="/article">
            <figure>
                <picture>
                    <img src={data.img} alt={"illustration de " + data.name} />
                </picture>
                <figcaption>
                    <h2>{data.name}</h2>
                    <div className="bottom">
                        <span>{data.price}€</span>
                        <Button color="" type="qty-select" value={quantity} callBack={setQuantity} maxValue={data.qty}  content=""/>
                        <Button color="green" type="text" content="Ajouter au pannier"/>
                    </div>
                </figcaption>
            </figure>
        </a>
    )
}

export default Article