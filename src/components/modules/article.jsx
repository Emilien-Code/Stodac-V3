import React from "react";
import Button from "../atoms/Button"
import "../../assets/styles/components/modules/article.scss"
const Article = ({data})=>{
    return (
        <a className="article" href="/article">
            <figure>
                <picture>
                    <img src={data.img} alt={"illustration de " + data.name} />
                </picture>
                <figcaption>
                    <h2>{data.name}</h2>
                    <div className="bottom">
                        <span>{data.price}€</span>
                        <Button color="" type="qty-select" content=""/>
                        <Button color="green" type="text" content="Ajouter au pannier"/>
                    </div>
                </figcaption>
            </figure>
        </a>
    )
}

export default Article