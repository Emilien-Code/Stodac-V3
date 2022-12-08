import React from "react";
import Search from "../modules/filters/search";
import Input from "../atoms/input";
import "../../assets/styles/components/sections/filters.scss"
import { setManufacter, setCategory } from "../../assets/scripts/store/redux-slices/filters";
import { useDispatch, useSelector } from "react-redux";

const Filters = ()=>{
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



    return (
    <div className="filters">
        <Search/>
        <div className="selects">
            <Input type="select" defaultValue={filters.manufactor ? filters.manufactor : "Marques"} selectValues={manufacturers} callBack={(e)=>{dispatch(setManufacter(e))}}/>
            <Input type="select" defaultValue={filters.category ? filters.category : "Categories"} selectValues={categories} callBack={(e)=>{dispatch(setCategory(e))}}/>
        </div>
    </div>
    )
}
export default Filters