import React from "react";
import "../../assets/styles/components/sections/titleAndParagraph.scss"

const TitleAndParagraph = ({title, paragraph, paragraph2})=>{
    return <section className="stodac-titleAndParagraph">
        <h1>{title}</h1>
        <p>{paragraph}</p>
        <p>{paragraph2}</p>
    </section>
}

export default TitleAndParagraph;