import React from "react";
import Input from "../../atoms/input"
import Article from "../article";
import Button from "../../atoms/Button";
import Icon from "../../atoms/Icon"
import "../../../assets/styles/components/modules/filters/search.scss"
const Search = ()=>{
    const [articles, setArticles] = React.useState([])
    const [isOpen, setIsOpen] = React.useState(false)
    const search = (firstLetters)=>{
        if(firstLetters){
            setIsOpen(true)
            fetch(`https://stodac.fr/api/stuff/name/${firstLetters}/4`)
            .then(response => response.json())
            .then(data => setArticles(data))
        }
    }
    const close = ()=>{
        setArticles([])
        setIsOpen(false)
    }


    return (
            <>
                <div className="search">
                    <Input type="text" placeHolder='Rechercher' callBack={search}/>
                    <Icon type="search"/>
                    {
                        articles.length > 0 ? 
                        <>
                            <div className="articles">
                        
                                <ul>
                                    {   
                                        articles.map((article, index)=>{
                                            return <li key={index}><Article display="onSearch"  data={article}/></li>
                                        })
                                    }
                                </ul>
                            </div>
                            <div className="footer">
                                {/* <hr /> */}
                                <Button type="text" color="green" content="Voir plus"/>
                            </div>
                        </>
                        : ""
                    }
                </div>
                {
                    isOpen && (
                        <div className="close-search" onClick={close}></div>
                    )
                }
            </>
    )
}
export default Search