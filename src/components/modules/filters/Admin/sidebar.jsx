import React from "react";
import "../../../../assets/styles/components/modules/filters/admin/filtersCommande.scss"
import Input from "../../../atoms/input";
import Icon from "../../../atoms/Icon";
import Search from "../search";
import { setManufacter, setCategory } from "../../../../assets/scripts/store/redux-slices/filters";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../../atoms/Button";
import formatNumber from "../../../../assets/scripts/utils/priceNormalisation";
const Filters = ({articles, callBack, more})=> {
    const dispatch = useDispatch()
    const [manufacturers, setManufacters] = React.useState([]);
    const [categories, setCategories] = React.useState([]);
    const filters = useSelector((state) => state.filters)
    console.log(filters)
    React.useEffect(()=>{
        
        fetch(`https://stodac.fr/api/stuff/manufacturer`)
        .then(response => response.json())
        .then( data => setManufacters(data))
        .catch(error => console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message));

        fetch(`https://stodac.fr/api/stuff/categories`)
        .then(response => response.json())
        .then( data => setCategories(data))
        .catch(error => console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message));

    }, [])

    return <div className="admin-filters sidebar">
        <header>
            <h4>Recherche</h4>  
            <Button callBack={more} type="svg" content="more"/>
        </header>
        
        <Search isPreview={false} isBlock={true}/>
        <Input type="select" selectType="Marques" defaultValue={filters.manufactor ? filters.manufactor : "Marques"} selectValues={manufacturers} callBack={(e)=>{dispatch(setManufacter(e))}}/>
        <Input type="select" selectType="Categories" defaultValue={filters.category ? filters.category : "Categories"} selectValues={categories} callBack={(e)=>{dispatch(setCategory(e))}}/>
        {
            articles.map( article => {
                return <button key={article._id} onClick={()=>{callBack(article)}}>
                        <img src={article.img} alt="illustartion" />
                        <div>
                            <h3>{ article.name }</h3>
                            <p> { formatNumber(article.price) } € </p>
                        </div>
                    </button>
            })
        }

    </div >

}

export default Filters 