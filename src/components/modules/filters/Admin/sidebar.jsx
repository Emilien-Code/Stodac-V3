import React from "react";
import "../../../../assets/styles/components/modules/filters/admin/filtersCommande.scss"
import Button from "../../../atoms/Button"
import Search from "../search";
const Filters = ({articles, callBack})=> {

    return <div className="admin-filters sidebar">
        <h4>Recherche</h4>
        <Search isBlock={true}/>
        {
            articles.map( article => {
                return <button key={article._id} onClick={()=>{callBack(article)}}>
                        <img src={article.img} alt="illustartion" />
                        <div>
                            <h3>{ article.name }</h3>
                            <p> { article.price } </p>
                        </div>
                    </button>
            })
        }

    </div >

}

export default Filters 