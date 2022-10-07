import React from "react";
import '../../assets/styles/components/atoms/accordeon.scss'
import Icon from "./Icon";
const Accordeon = ({type, title, content})=>{
    const [isOpen, setIsOpen] = React.useState(false)
    const toogleOpen = ()=>{
        setIsOpen(!isOpen);
        console.log(isOpen)
    }
    let count = 0

    return (<section className="acordeon close">
            <hr />
            <div className="title" onClick={toogleOpen}>
                <p>{title}</p> <Icon type={isOpen ? "less" : "more"}/>
            </div>
            {
                isOpen && (
                    <div className="content">
                        {
                            type==="compatibilities" && (
                                <p>{content.map(el=>{
                                    return el ? `${el}, ` : ""
                                } )}</p>
                            )
                        }{
                            type==="technique" && (
                                <ul>{content.map(el=>{
                                    count++
                                    return <li key={count}>
                                        <article>
                                            <div className="left">
                                                {count===1 ?  "Article" : ""}
                                                {count===2 ?  "Fabriquant" : ""}
                                                {count===3 ?  "Référence" : ""}
                                                {count===4 ?  "État du produit" : ""}
                                            </div>
                                            <div className="right">
                                                {el}
                                            </div>
                                        </article></li>
                                } )}</ul>
                            )
                        }
                    </div>
                )
            }

            </section>
    )
}
export default Accordeon;