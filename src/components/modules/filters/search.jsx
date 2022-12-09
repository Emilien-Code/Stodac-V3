import React from "react";
import Input from "../../atoms/input"
import Article from "../article";
import Button from "../../atoms/Button";
import Icon from "../../atoms/Icon"
import "../../../assets/styles/components/modules/filters/search.scss"
import { useDispatch } from "react-redux";
import { setSearched } from "../../../assets/scripts/store/redux-slices/filters";

const Search = ({isBlock, isPreview})=>{
    const [articles, setArticles] = React.useState([])
    const [isOpen, setIsOpen] = React.useState(false) 
    const [fl, setFl] = React.useState("") 
    const dispatch = useDispatch();
    const search = (firstLetters)=>{
        setFl(firstLetters)
        if(firstLetters){
            setIsOpen(true)
            fetch(`https://stodac.fr/api/stuff/name/${firstLetters}/4`)
            .then(response => response.json())
            .then(data => setArticles(data))
        }
    }
    const push = ()=>{
        dispatch(setSearched(fl))
        close();
    }
    const close = ()=>{
        setArticles([])
        setIsOpen(false)
    }


    return (
            <>
                <div className={`search ${isBlock ? "block" : ""}`}>
                    <Input type="text" placeHolder='Rechercher' handleKeyDown={push} callBack={search} />
                    <Icon type="search"/>
                    {
                        articles.length && isPreview > 0 ? 
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
                                <Button callBack={push} type="text" color="green" content="Voir plus"/>
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